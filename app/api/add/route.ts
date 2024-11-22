import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, actors, year } = body;

    if (!title || !actors || !year) {
      return NextResponse.json({
        error: "Title, actors, and year are required.",
      });
    }

    if (!Array.isArray(actors) || actors.length === 0) {
      return NextResponse.json({
        error: "Actors must be an array with at least one actor.",
      });
    }

    if (typeof year !== "number") {
      return NextResponse.json({ error: "Year must be a valid number." });
    }

    const newMovie = await prisma.movie.create({
      data: {
        title,
        actors,
        year,
      },
    });
    console.log(newMovie);

    return NextResponse.json(newMovie);
  } catch (error) {
    console.error("Error adding movie:", error);
    NextResponse.json({ error: "Internal server error." });
  }
}
