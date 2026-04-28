import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Se for deletar um CLIENTE, nós também deletamos o paciente atrelado
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    if (user.role === "CLIENTE") {
      // Find the associated patient
      const patient = await prisma.patient.findFirst({
        where: { userId: id }
      });
      if (patient) {
        await prisma.patient.delete({
          where: { id: patient.id }
        });
      }
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
