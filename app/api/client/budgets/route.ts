import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();

  if (!session || session.role !== "CLIENTE") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const patient = await prisma.patient.findUnique({
      where: { userId: session.id },
    });

    if (!patient) {
      return NextResponse.json({ error: "Paciente não encontrado para este usuário" }, { status: 404 });
    }

    const budgets = await prisma.budget.findMany({
      where: { patientId: patient.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(budgets);
  } catch (error) {
    console.error("Error fetching client budgets:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
