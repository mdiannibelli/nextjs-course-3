'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";



export const toggleTodoServerAction = async(id: string, complete: boolean): Promise<Todo> => {
    
    await sleep(3)
    
    const todo = await prisma.todo.findFirst({where: {id}})
    
    if(!todo) {
        throw `Todo ${id} not found`
    }

    const updatedTodo = await prisma.todo.update({
        where: {id},
        data: {
            complete: complete
        }
    })
    revalidatePath('dashboard/server-todos')
    return updatedTodo
}

export const createTodoServerAction = async(description: string) => {
    const session = await getServerSession(authOptions);
    
    try {
        const newTodo = await prisma.todo.create({
            data: {
                description: description,
                userId: session?.user?.id ?? 'no-id'
            }
    })
    revalidatePath('/dashboard/server-todos')
    return newTodo
        
    } catch (error) {
        return {
            message: 'Error in creating todo'
        }
    }
}

export const deleteTodosServerAction = async(): Promise<void> => {
    await prisma.todo.deleteMany({where: {complete: true}})
    revalidatePath('/dashboard/server-todos')

}


//! Demora intencional
export const sleep = async(seconds: number = 0) => {
    return new Promise(res => {
        setTimeout(() => {
            res(true)
        }, seconds * 1000)
    })
}