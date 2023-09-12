import { NextResponse } from "next/server"
import { connectDB } from '../../../utils/connectDB'
import prisma from "@/prisma"

export async function POST(req: Request) {
    const { text, isChecked } = await req.json()

    try {
        await connectDB()
        await prisma.todo.create({ data: { text, isChecked }})
        
        return NextResponse.json({ message: 'Todo added successfully' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function GET() {
    try {
        await connectDB()
        const todos = await prisma.todo.findMany()

        return NextResponse.json({ data: todos }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function PUT(req: Request) { 
    const { id } = await req.json() 
    let value = false

    try {
        await connectDB()
        const todo = await prisma.todo.findUnique({ where: { id: id }})
        if (todo?.isChecked === true) {
            value = false
        } else {
            value = true
        }

        const updated = await prisma.todo.update({
            data: {
                isChecked: value
            },
            where: {
                id: id
            }
        })

        return NextResponse.json({ data: updated }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}

export async function DELETE(req: Request) { 
    const { id } = await req.json() 

    try {
        await connectDB()
        await prisma.todo.delete({ where: { id: id }})

        return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}