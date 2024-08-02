import { Payment } from "@/components/payments/paymentProcess";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default function page() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }
  return (
    <div>
      <Payment />
    </div>
  );
}
