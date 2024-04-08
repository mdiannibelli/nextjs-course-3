'use client';

import { IoTrashOutline } from "react-icons/io5";
import { FormEvent, useState } from "react";
import * as api from '@/todos/helpers/todos'
import { useRouter } from "next/navigation";
import { createTodoServerAction, deleteTodosServerAction } from "../actions/todo-actions";

export const AddTodo = () => { 
    const [descriptionValue, setDescriptionValue] = useState<string>('')
    const router = useRouter();

    const onSubmit = async(e:FormEvent) => {
        e.preventDefault();
        // Si la descripción introducida es 0 devolvemos nada
        if(descriptionValue.trim().length === 0) return;

        //? With API RESTful
        // api.createTodo(descriptionValue)
        await createTodoServerAction(descriptionValue)
        setDescriptionValue('')
        // router.refresh()
    }

   //? With API RESTFUL 
   // const onDelete = () => {
   //     api.deleteCompleted()
   //     router.refresh()
   // }

  return (
    <form onSubmit={onSubmit}  className='flex w-full'>
      <input type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        value={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)} />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>
      
      <span className='flex flex-1'></span>

      <button 
        //? With API RESTFUL => onClick={() => onDelete()}
        onClick={() => deleteTodosServerAction()}
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        Delete Completed
      </button>


    </form>
  )
}