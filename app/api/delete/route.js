
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
//export async function DELETE(req) {

export const DELETE = async (request, { params }) => {
  const { id } = params
  try {
    const deleteMovie = await prisma.Movie.deleteOne({
      where: {
        id: id
      },
    });
    console.log(deleteMovie);

    return NextResponse.json({ message: "Move Deleted", deleteMovie });
  } catch (error) {
    console.error("Error deleting movie:", error);
    NextResponse.json({ error: "Internal server error."}, { status: 500 });
  }
}
