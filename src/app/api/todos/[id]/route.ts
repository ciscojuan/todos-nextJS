import prisma from "@/lib/pisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: {
    id: string;
    description: string;
    complete?: boolean;
  };
}

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

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
      error: error,
    });
  }
}

const updateSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

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
