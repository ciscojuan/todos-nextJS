import prisma from "@/app/lib/pisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request, res: Response) {
  try {
    prisma.todo.deleteMany();

    const todos = await prisma.todo.createMany({
      data: [
        { description: "Piedra del alma", complete: true },
        { description: "Piedra del Tiempo", complete: false },
        { description: "Piedra del Espacio", complete: false },
        { description: "Piedra del Poder", complete: false },
        { description: "Piedra del Realidad", complete: true },
      ],
    });
    return NextResponse.json({ message: "Todos created", todos });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
