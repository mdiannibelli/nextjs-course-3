export const dynamic = 'force-dynamic'
export const revalidate = 0; 
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
/* 'use client' */

import prisma from '@/lib/prisma'
import { AddTodo } from '@/todos/components/AddTodo';
import TodoGrid from '@/todos/components/TodoGrid';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export const metadata = {
  title: 'Listado de TODOS',
  description: 'Todo list'
}

export default async function RestTodosPage() {
  const session = await getServerSession(authOptions);

  if(!session) redirect('/api/auth/signin')
  const todos = await prisma.todo.findMany({
    where: {userId: session.user?.id}
  });
  /* console.log(todos) */
  //useEffect(() => {
  //  fetch('/api/todos').then((res) => res.json()).then(console.log)
  //}, [])
  return (
    <div>
      {/* TODO FORM */}
      <div className='w-full px-3 mx-5 mb-5'>
        <AddTodo/>
      </div>
      <h1>Rest Todos</h1>

      <TodoGrid todos={todos}/>
      
    </div>
  )
}
