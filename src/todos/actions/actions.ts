"use server";
import prisma from "@/lib/pisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) throw `Todo  with id ${id} not found `;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-actions");
  return updatedTodo;
};

export const addTodo = async (description: string, complete: boolean) => {
  try {
    const todo = await prisma.todo.create({ data: { description, complete } });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "Error creando todo",
      error,
    };
  }
};

export const deletedTodos = async() => {
try{
    const todo = prisma.todo.deleteMany({where: {complete: true}})
    revalidatePath("/dashboard/server-todos");
    return todo
}catch(error){
  return error
}
}