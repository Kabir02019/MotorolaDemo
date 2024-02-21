import React from 'react'
import { Priority } from '@prisma/client'
import { Flame } from 'lucide-react'

interface Props {
    priority: Priority
    }

    const priorityMap: Record<Priority,{label: string, level: 1 | 2| 3}> = {
        LOW: {label: "Low", level: 1},
        MEDIUM: {label: "Medium", level: 2},
        HIGH: {label: "High", level: 3}
        }

export const TicketPriority = ( {priority}: Props) => {
  return (
    <div className='flex justify-between mb-3'>
        <Flame className = {`${priorityMap[priority].level >= 1 ? " text-red-500":"text-muted "}`}/>
        <Flame  className = {`${priorityMap[priority].level >= 2 ? " text-red-500":"text-muted "}`} />
        <Flame  className = {`${priorityMap[priority].level >= 3 ? " text-red-500":"text-muted "}`} />
    </div>
  )
}
