import { ticketSchema } from '@/ValidationSchemas/ticket';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from "@/prisma/db"
import { get } from 'http';
import { getServerSession } from 'next-auth';
import options from '../auth/[...nextauth]/options';

export async function POST(request: NextRequest)
{

    const session = await getServerSession(options);

    if(!session)
    {
        return NextResponse.json({message: "You are not authorized to perform this action"}, {status: 401});
    }
    const body = await request.json()
    const validation = ticketSchema.safeParse(body)

    if (!validation.success)
    {
        return NextResponse.json(validation.error.format(), {status: 400});
            
    }

    const newTicket = await prisma?.ticket.create({
        data: {...body},
    }); 

    return NextResponse.json(newTicket,{status: 201});
}