"use client"
import React from 'react'
import { Button } from './ui/button';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props{
    itemCount: number;
    currentPage: number;
    pageSize: number;
}


const Pagination = ({itemCount,pageSize,currentPage}: Props) => {
    const pageCount = Math.ceil(itemCount/pageSize)
    const router = useRouter()
    const searchParams = useSearchParams()
    if(pageCount <= 1) return null;

    const chnagPage = ( page: number) =>
    {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push("?" + params.toString())
    }

  return (
    <div className = 'mt-4'>
        <div>
        <Button variant = "outline" disabled = {currentPage ===1}
        onClick={() => chnagPage(1)}
        ><ChevronFirst /></Button>
        <Button variant = "outline" disabled = {currentPage ===1}
        onClick={() => chnagPage(currentPage - 1)}
        ><ChevronLeft /></Button>
        <Button variant = "outline" disabled = {currentPage === pageCount}
        onClick={() => chnagPage(currentPage + 1)}
        ><ChevronRight /></Button>
        <Button variant = "outline" disabled = {currentPage === pageCount}
        onClick={() => chnagPage(pageCount)}
        ><ChevronLast /></Button>
        </div>
        <div>
            <p>Page {currentPage} of {pageCount}</p>
        </div>
    </div>
  )
}

export default Pagination