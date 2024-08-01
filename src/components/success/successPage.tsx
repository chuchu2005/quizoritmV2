"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import success from "../../../public/success.gif";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SuccessPage() {
  const method = sessionStorage.getItem("method");
  const plan = sessionStorage.getItem("plan");
  const router = useRouter();

  if(!plan || !method ) {
    router.push("/")
  }
  // Initialize date as a Date object
  const date = new Date();

  let expirationDate;
  if (plan === 'Monthly') {
    // Add one month to the start date
    expirationDate = new Date(date.setMonth(date.getMonth() + 1));
  } else if (plan === 'Yearly') {
    // Add one year to the start date
    expirationDate = new Date(date.setFullYear(date.getFullYear() + 1));
  }

  const handlePaystackPayment = async () => {
    await axios.post("/api/payment")
  } 

  if (method === 'paystack'){
    handlePaystackPayment();
  }
  return (
    <div className="fixed sm:-translate-x-1/2 sm:-translate-y-1/2 sm:top-1/2 sm:left-1/2">
      <Card className="w-[100%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Success</CardTitle>
          <CardDescription>
            {method === "flutterwave" &&
              "The cancellation process is handled by the email sent to your box"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 text-center items-center">
            <Image
              src={success}
              alt="success animation"
              width={100}
              height={100}
            />
          </div>
          <div className="mt-5 flex flex-col gap-y-1">
            <h3 className="underline mb-2">Details:</h3>
            <p>Plan: {plan}</p>
            <p>Price: {plan === "Monthly" ? "$9" : plan === "Yearly" && "$90"}</p>
            <p>Method: {method}</p>
            <p>Expires: {expirationDate ? expirationDate.toISOString().split('T')[0] : 'N/A'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
