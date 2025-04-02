
import prisma from "@/lib/pisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "Listado de Todos",
  description: "Listado de Todos",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div className="flex flex-col justify-center ">
      <h1 className="text-5xl p-5 text-center">Server Actions</h1>

      <div className="w-full px-3 mb-5">
        {<TodosGrid todos={todos} />}
        <NewTodo />
      </div>
    </div>
  );
}
