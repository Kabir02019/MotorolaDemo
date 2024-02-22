import React from 'react'
import UserForm from '@/components/UserForm'
import DataTablrSimple from './data-table-simple'
import prisma from '@/prisma/db'

const Users = async () => {

  const users = await prisma.user.findMany();

  return (
    <div>
      <UserForm/>
      <DataTablrSimple users={users}/>
    </div>

  )
}

export default Users