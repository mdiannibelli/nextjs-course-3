import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { boolean, object, string } from "yup";
import { authOptions } from "../../auth/[...nextauth]/route";

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, args:Segments) {
    const session = await getServerSession(authOptions);
    if(!session) return null;
    //console.log({args})
    const {id} = args.params
    //console.log(id)
    const todo = await prisma.todo.findFirst({where: {id}})
    if(!todo) {
        return NextResponse.json({message: `Todo ${id} not found`}, {status: 404})
    }

    if(todo?.userId !== session.user?.id) {
        return null;
    }

    return NextResponse.json(todo)
}


//! YUP VALIDATION
const schemaObject = object({
    description: string().optional(),
    complete: boolean().optional()
})
export async function PUT(request: Request, args:Segments) {
    //console.log({args})
    const {id} = args.params
    //console.log(id)
    const todo = await prisma.todo.findFirst({where: {id}})

    if(!todo) {
        return NextResponse.json({message: `Todo ${id} not found`}, {status: 404})
    }

    try {
        const {complete, description} = await schemaObject.validate(await request.json());
    
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {
                complete,
                description
            }
        })
    
        return NextResponse.json(updatedTodo)
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
}