import prisma from "@/lib/pisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") || "10");
  const skip = Number(searchParams.get("skip") || "1");
  console.log(`Take: ${take}, Skip: ${skip}`);
  try {
    if (isNaN(take)) {
      return NextResponse.json(
        { message: "take debe ser un numero" },
        { status: 400 }
      );
    }

    if (isNaN(skip)) {
      return NextResponse.json(
        { message: "skip debe ser un numero" },
        { status: 400 }
      );
    }

    const todos = await prisma.todo.findMany({
      take,
      skip,
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error al obtener los todos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
//Validaciones
const postScheme = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { description, complete } = await postScheme.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: { description, complete },
    });

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });
    return NextResponse.json({ message: "todos deleted." }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
