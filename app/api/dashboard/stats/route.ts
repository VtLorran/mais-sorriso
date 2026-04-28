import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [totalPatients, appointmentsToday, totalRecords, nextAppointments] = await Promise.all([
      prisma.patient.count(),
      prisma.appointment.count({
        where: {
          date: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      prisma.dentalRecord.count(),
      prisma.appointment.findMany({
        where: {
          date: {
            gte: new Date(),
          },
        },
        include: {
          patient: true,
        },
        take: 3,
        orderBy: {
          date: "asc",
        },
      }),
    ]);

    return NextResponse.json({
      totalPatients,
      appointmentsToday,
      totalRecords,
      nextAppointments,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
