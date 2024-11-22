import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET() {
  const allMovies = await prisma.movie.findMany({
    select: {
      title: true,
      actors: true,
      year: true,
      id: true,
    },
  });
  return NextResponse.json(allMovies);
}
