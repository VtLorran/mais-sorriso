import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params; // Dar o await aqui
  try {
    const body = await request.json();
    const { patientId, date, dentistId } = body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        patientId,
        date: date ? new Date(date) : undefined,
        dentistId,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error updating appointment:", error);
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
    await prisma.appointment.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
