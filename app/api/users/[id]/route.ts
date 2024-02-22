import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { userSchema } from "@/ValidationSchemas/users";

interface Props {
    params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Props){
    const body = await request.json()
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }


    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!user) {
        return NextResponse.json({error: "User Not Found"}, { status: 400 });
    }

    if(body?.password && body.password != "" ){
        const hashedPassword = await bcrypt.hash(body.password, 10);
        body.password = hashedPassword;
    }
    else
    {
        delete body.password;
    }
    console.log(body);

    if(user.username !== body.username){
        const duplicateUsername = await prisma.user.findUnique({
            where: {
                username: body.username
            }
        })

        if(duplicateUsername){
            return NextResponse.json({message: "Duplicate Username"}, {status: 409});
        }
    }

    const updateUser = await prisma.user.update({
        where: {
            id: user.id},
            data: {...body},
        }
    );

    return NextResponse.json(updateUser);
}
