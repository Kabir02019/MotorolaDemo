import React from 'react'
import prism from "@/prisma/db"
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

interface SearchParams {
  page : string;
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Tickets = async ({searchParams} : {searchParams: SearchParams} ) => {

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;


  const ticketCount = await prisma.ticket.count();

  const tickets = await prisma.ticket.findMany({

    take: pageSize,
    skip: pageSize * (page - 1),
  })


  return (
    <div>
      <Link href = "/tickets/new" className ={buttonVariants({variant: "default"})}> New Moto Ticket</Link>
      <DataTable tickets = {tickets}/> 
      <Pagination itemCount = {ticketCount} pageSize={10} currentPage={page}/>
    </div>
  )
};

export default Tickets;