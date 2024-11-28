
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
//export async function DELETE(req) {

export const DELETE = async (request) => {
  
  try {
    const { id } = await request.json();
    const deleteMovie = await prisma.movie.delete({
      where: {
        id: id
      }
    });
    console.log(deleteMovie);

    return NextResponse.json("Move Deleted", deleteMovie);
  } catch (error) {
    console.error("Error deleting movie:", error);
    NextResponse.json({ error: "Internal server error."}, { status: 500 });
  }
}
