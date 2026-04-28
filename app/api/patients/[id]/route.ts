import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, age, phone } = body;

    const patient = await prisma.patient.update({
      where: { id: params.id },
      data: {
        name,
        age: age ? parseInt(age.toString()) : undefined,
        phone,
      },
    });

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.patient.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Patient deleted" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
