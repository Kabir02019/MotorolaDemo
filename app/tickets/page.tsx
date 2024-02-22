import React from 'react'
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import Pagination from '@/components/Pagination';

export interface SearchParams {
  status: Status
  page : string;
  orderBy: keyof Ticket;
}

import { PrismaClient, Status, Ticket } from '@prisma/client';
import StatusFilter from '@/components/StatusFilter';

const prisma = new PrismaClient();

const Tickets = async ({searchParams} : {searchParams: SearchParams} ) => {

  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;


  

  const Statuses = Object.values(Status);
  const status = Statuses.includes(searchParams.status) ? searchParams.status : undefined;

  let where = {}

  if(status)
  {
    where = {
      status
    }

  }

  else
  {
    where = {
      NOT: [{status: "CLOSED" as Status}]
    }
  }


  const ticketCount = await prisma.ticket.count({where});
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: pageSize * (page - 1),
  })


  return (
    <div>

      <div className='flex  gap-2'>

      <Link href = "/tickets/new" className ={buttonVariants({variant: "default"})}> New Moto Ticket</Link>
      <StatusFilter />
      </div>
      <DataTable tickets={tickets} searchParams ={searchParams}/> 
      <Pagination itemCount = {ticketCount} pageSize={10} currentPage={page}/>
    </div>
  )
};

export default Tickets;