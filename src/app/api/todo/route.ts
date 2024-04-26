import prisma from "@/lib/db"
import { TodoStatus } from "@prisma/client"

export async function GET() {
    const todos = await prisma.todo.findMany({
        select: {
            name: true,
            description: true,
            status: true,
        },
    })
    return Response.json(todos)
}

export async function POST(req: Request) {
    const body = await req.json()
    await prisma.todo.create({
        data: {
            ...body,
            status: TodoStatus.NEW,
        },
    })
    return Response.json(body)
}
