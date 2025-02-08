import prisma from "@/app/lib/pisma";
import { NextResponse, NextRequest } from "next/server";

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
