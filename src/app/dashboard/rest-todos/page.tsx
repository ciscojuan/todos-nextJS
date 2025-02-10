import prisma from "@/lib/pisma";


export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Page Todos</h1>
      <div className="todos">

      {
        JSON.stringify(todos)
      }
      </div>
    </div>
  );
}
