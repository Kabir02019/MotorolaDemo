import React from 'react'
import prism from "@/prisma/db"
import DataTable from './DataTable';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';


const tickets = async () => {
  const tickets = await prism.ticket.findMany()
  console.log(tickets)
  return (
    <div>
      <Link href = "/tickets/new" className ={buttonVariants({variant: "default"})}> New Moto Ticket</Link>
      <DataTable tickets = {tickets}/> 
    
    </div>
  )
};

export default tickets;