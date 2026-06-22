import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// Mark notifications as read
export async function PATCH(request: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const { id } = body;

    if (id) {
      // Mark specific notification as read
      const notification = await prisma.notification.update({
        where: { id, userId: session.id },
        data: { read: true },
      });
      return NextResponse.json(notification);
    } else {
      // Mark all notifications for this user as read
      const updateResult = await prisma.notification.updateMany({
        where: { userId: session.id, read: false },
        data: { read: true },
      });
      return NextResponse.json({ success: true, count: updateResult.count });
    }
  } catch (error) {
    console.error("Error updating notifications:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
