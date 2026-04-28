import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { description } = body;

    const record = await prisma.dentalRecord.update({
      where: { id },
      data: {
        description,
      },
    });

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error updating dental record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    await prisma.dentalRecord.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Dental record deleted" });
  } catch (error) {
    console.error("Error deleting dental record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
