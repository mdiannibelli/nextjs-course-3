'use client' // Por el onClick de updateTodo
import React from 'react'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';
import { Todo } from '@prisma/client';

interface Props {
    description: string;
    date: string;
    id: string;
    complete: boolean;
    // TODO Acciones que quiero llamar
    updateTodo: (id:string, complete:boolean) => Promise<Todo>
}

export default function TodoItem({description, id, complete, updateTodo} : Props) {

  return (
    <div className={complete ? styles.todoDone : styles.todoPending}>
        <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
            <div
            onClick={() => updateTodo(id, !complete)} 
            className={`
                flex p-2 rounded-md cursor-pointer
                hover:bg-opacity-60
                ${complete ? 'bg-blue-100' : 'bg-red-100'}
            `}>
                {
                    complete  
                    ? <IoCheckboxOutline size={30}/>
                    : <IoSquareOutline size={30}/>
                     
                }
            </div>
            <div className='text-center sm:text-left'>
                {description}
            </div>
        </div>
            
    </div>
  )
}
