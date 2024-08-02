import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const { method, plan } = await request.json();

  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({
        message: "You must be logged in to subscribe",
        status: 401,
      });
    }

    // Update the user's plan
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        plan: plan,
        paymentMethod: method,
      },
    });

    return NextResponse.json({
      message: "User Registred",
      status: 200,
    });
  } catch (error) {
    console.error("Error updating user plan:", error);
    return NextResponse.json({
      message: "An unexpected error occurred.",
      status: 500,
    });
  }
}
