'use client'
import { Todo } from '@prisma/client'
import React from 'react'
import TodoItem from './TodoItem';

interface Props {
    todos?: Todo[];
}

import * as api from '@/todos/helpers/todos' // <= import all functions todo
import { useRouter } from 'next/navigation';

//! Server Action
import { toggleTodoServerAction } from '../actions/todo-actions';


export default function TodoGrid({todos = []}: Props) {

  //? Usando API RESTFUL
    //! Importamos el useRouter de NEXT/NAVIGATION
    //const router = useRouter()

    // Creamos una función que va a actualizar ese componente en específico 
    // se la pasamos al updateTodo que esta esperando el TodoItem

    //const toggleTodo = async(id:string, complete:boolean) => {
        // console.log({id, complete})
    //    const todoUpdate = await api.updateTodo(id, complete); // <= llamamos a la petición PUT 

    //    router.refresh() // Esto va a refrescar el componente
    //    return todoUpdate
    //}

  return (
    <>
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {
        todos.map((todo) => (
          <TodoItem key={todo.id} 
          //? Usando API Restful => updateTodo={toggleTodo} 
          //! Server action =>
          updateTodo={toggleTodoServerAction}
          id={todo.id} complete={todo.complete} date={JSON.stringify(todo.createdAt)} description={todo.description}/>
        ))
      }
    </div>
    </>
  )
}
