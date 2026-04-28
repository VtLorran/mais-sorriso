import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json({ error: "Patient ID is required" }, { status: 400 });
    }

    const records = await prisma.dentalRecord.findMany({
      where: { patientId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching dental records:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, toothNumber, description } = body;

    if (!patientId || toothNumber === undefined || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const record = await prisma.dentalRecord.create({
      data: {
        patientId,
        toothNumber: parseInt(toothNumber),
        description,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error creating dental record:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
