import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const p = await params;
    const body = await request.json();
    const { action } = body; // "APPROVE" or "REJECT"

    if (!p.id || !action) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const regRequest = await prisma.registrationRequest.findUnique({
      where: { id: p.id },
    });

    if (!regRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    if (action === "REJECT") {
      const updated = await prisma.registrationRequest.update({
        where: { id: p.id },
        data: { status: "REJECTED" },
      });
      return NextResponse.json(updated);
    }

    if (action === "APPROVE") {
      // Begin approval process
      
      // Update status
      const updated = await prisma.registrationRequest.update({
        where: { id: p.id },
        data: { status: "APPROVED" },
      });

      // Create User
      const user = await prisma.user.create({
        data: {
          name: regRequest.name,
          email: regRequest.email,
          cpf: regRequest.cpf,
          dateOfBirth: regRequest.dateOfBirth,
          phone: regRequest.phone,
          role: "CLIENTE",
          status: "APPROVED"
        }
      });

      // Create Patient automatically
      await prisma.patient.create({
        data: {
          userId: user.id,
          name: user.name,
          phone: user.phone || "",
          dateOfBirth: user.dateOfBirth
        }
      });

      return NextResponse.json(updated);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Error updating request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
