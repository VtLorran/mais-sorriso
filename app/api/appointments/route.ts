import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        dentist: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, date, dentistId } = body;

    if (!patientId || !date) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        date: new Date(date),
        dentistId: dentistId || null,
      },
      include: {
        patient: true,
        dentist: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
