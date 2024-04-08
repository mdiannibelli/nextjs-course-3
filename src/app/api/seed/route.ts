import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from 'bcryptjs'

export async function GET(request: Request) {
    await prisma.todo.deleteMany() // Delete * FROM todo
    await prisma.user.deleteMany() // Delete * FROM todo

    const user = await prisma.user.create({
        data: {
            email: 'test@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin'],
            todos: {
                create: [
                    {description: 'Piedra del alma', complete: true},
                    {description: 'Piedra del poder'},
                    {description: 'Piedra del tiempo'},
                    {description: 'Piedra del espacio'},
                    {description: 'Piedra de la realidad'}
                ]
            }
        }
    })

   //await prisma.todo.createMany({
    //data: [
        //{description: 'Piedra del alma', complete: true},
        //{description: 'Piedra del poder'},
        //{description: 'Piedra del tiempo'},
        //{description: 'Piedra del espacio'},
        //{description: 'Piedra de la realidad'},
    //]
   //})

    return NextResponse.json({
        message: 'seed executed'
    })
}