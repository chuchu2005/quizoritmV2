import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to subscribe" },
        {
          status: 401,
        }
      );
    }

    // Update the user's plan
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        plan: sessionStorage.getItem("plan") || '',
        paymentMethod: sessionStorage.getItem("method"),
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user plan:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      }
    );
  }
}