import { MyLocation } from "@/components/location"

export default async function Home() {
<<<<<<< HEAD
  return (
    <div>
      Your location: <MyLocation />
    </div>
  )
=======
    
    const todos = await prisma.todo.findMany()

    return (
        <main className="p-8">
            <div className="flex flex-col gap-8">
                <Todos todos={todos} />
                <AddTodo />
            </div>
        </main>
    )
>>>>>>> e3c0a1b (nearby places action)
}
