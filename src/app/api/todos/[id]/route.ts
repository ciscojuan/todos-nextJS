import prisma from "@/lib/pisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extraer el ID de la URL
  try {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      return NextResponse.json(
        { error: "Todo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      todo: todo,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Ocurrió un error al recuperar el Todo.",
      details: error,
    });
  }
}

const updateSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extraer el ID de la URL

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo)
    return NextResponse.json({ error: "Todo no encontrado" }, { status: 404 });

  try {
    const { description, complete } = await updateSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json({
      todo: updatedTodo,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
