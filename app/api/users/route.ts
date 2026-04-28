import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      role: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || session.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, email, cpf, dateOfBirth, phone, role } = await request.json();

    if (!name || !cpf || !role || !dateOfBirth) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const cleanCpf = cpf.replace(/\D/g, "");

    const existingUser = await prisma.user.findUnique({
      where: { cpf: cleanCpf },
    });

    if (existingUser) {
      return NextResponse.json({ error: "CPF já cadastrado" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email || null,
        cpf: cleanCpf,
        dateOfBirth: new Date(dateOfBirth),
        phone,
        role,
        status: "APPROVED",
      },
    });

    if (role === "CLIENTE") {
      await prisma.patient.create({
        data: {
          userId: user.id,
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          phone: user.phone || "",
        },
      });
    }

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
