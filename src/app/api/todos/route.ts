import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { boolean, object, string } from "yup";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url) // Tomamos los params de la URL mediante el request
    const take = Number(searchParams.get('limit') ?? '10'); // Tomamos el param limit y si no viene nada por defecto será 10
    const skip = Number(searchParams.get('offset') ?? '0'); // Tomamos el param offset y si no viene nada por defecto será 0

    if(isNaN(take)) {
        return NextResponse.json({message: 'Limit tiene que ser un numero'}, {status: 400}); // Verificamos si limit es un número
    } 

    if(isNaN(skip)) {
        return NextResponse.json({message: 'Offset tiene que ser un numero'}, {status: 400})
    }

    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip,
    })

    return NextResponse.json(todos);
}

//! YUP VALIDATION
const postSchema = object({
    description: string().required(),
    complete: boolean().optional().default(false), 
})

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json('No autorizado', {status: 401});
    try {
        const {description, complete} = await postSchema.validate(await request.json())
    
        const todo = await prisma.todo.create({
           data: {
            description: description, 
            complete: complete,
            userId: session.user?.id ?? ''
        }
        })
    
        return NextResponse.json(todo)
    } catch (error) {
        return NextResponse.json(error, {status: 400})
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json('No autorizado', {status: 401});
    try {
        await prisma.todo.deleteMany({where: {complete: true, userId: session.user?.id}})

        return NextResponse.json('Completed todo deleted')
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, {status: 400})
    }
}