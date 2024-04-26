import { AddTodo } from "@/components/addtodo"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import prisma from "@/lib/db"
import { Todo } from "@prisma/client"

export async function Todos({ todos }: { todos: Todo[] }) {
    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 md:gap-4">
            {todos.map((todo) => {
                return (
                    <Card key={todo.id}>
                        <CardHeader>
                            <CardTitle>{todo.name}</CardTitle>
                            <CardDescription>
                                {todo.description}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    )
}

export default async function Home() {
    const todos = await prisma.todo.findMany()
    return (
        <main className="p-8">
            <div className="flex flex-col gap-8">
                <Todos todos={todos} />
                <AddTodo />
            </div>
        </main>
    )
}
