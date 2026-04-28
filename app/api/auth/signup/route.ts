import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

export async function POST(request: Request) {
  try {
    const { name, email, cpf, dateOfBirth, phone } = await request.json();

    if (!name || !email || !cpf || !dateOfBirth) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    if (!cpfValidator.isValid(cpf)) {
      return NextResponse.json({ error: "CPF inválido" }, { status: 400 });
    }

    const cleanCpf = cpf.replace(/\D/g, "");

    const existingUser = await prisma.user.findUnique({
      where: { cpf: cleanCpf },
    });

    if (existingUser) {
      return NextResponse.json({ error: "CPF já cadastrado no sistema" }, { status: 400 });
    }

    const existingRequest = await prisma.registrationRequest.findUnique({
      where: { cpf: cleanCpf },
    });

    if (existingRequest && existingRequest.status === "PENDING") {
      return NextResponse.json({ error: "Já existe uma solicitação pendente para este CPF" }, { status: 400 });
    }

    await prisma.registrationRequest.upsert({
      where: { cpf: cleanCpf },
      update: {
        name,
        email,
        dateOfBirth: new Date(dateOfBirth),
        phone,
        status: "PENDING"
      },
      create: {
        name,
        email,
        cpf: cleanCpf,
        dateOfBirth: new Date(dateOfBirth),
        phone,
        status: "PENDING"
      }
    });

    return NextResponse.json({ 
      message: "Solicitação enviada com sucesso"
    }, { status: 201 });
  } catch (error) {
    console.log("Registration request error:", error);
    return NextResponse.json({ error: "Erro interno do servidor", details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
