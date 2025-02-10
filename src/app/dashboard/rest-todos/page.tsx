import prisma from "@/lib/pisma";
import { TodosGrid } from "@/todos";


export const metadata = {
 title: 'Listado de Todos',
 description: 'Listado de Todos',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div className="flex flex-col  justify-center ">
      <h1 className="text-5xl p-5 text-center">Page Todos</h1>
      <div className="todos">

      {
        <TodosGrid todos={ todos } />
      }
      </div>
    </div>
  );
}
