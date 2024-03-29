import { userSchema } from "@/ValidationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { getServerSession } from 'next-auth';
import options from '../auth/[...nextauth]/options'

export async function POST(request: NextRequest) {
    
  const session = await getServerSession(options);

    if(!session)
    {
        return NextResponse.json({message: "You are not authorized to perform this action"}, {status: 401});
    }


    if(session.user?.role !== "ADMIN")
    {
        return NextResponse.json({message: "You are not authorized to perform this action"}, {status: 401});
    }

    
  
  
  const body = await request.json()
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const duplicate = await prisma.user.findUnique({
         where: { 


            username: body.username
          }, });



          if(duplicate)
          {
                return NextResponse.json({message: "Duplicate Username"}, {status: 409});
          }

          const hashedPassword = await bcrypt.hash(body.password, 10);
          body.password = hashedPassword

          const newUser = await prisma.user.create({
            data: {...body}
          })

          return NextResponse.json(newUser, {status: 201});
}
