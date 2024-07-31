import { prisma } from "@/lib/db";
import axios from "axios";
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

interface User {
  userId: string | null;
  email: string | null;
  paymentMethod: string | null;
  plan: string;
}

export async function fetchPayment({ user }: { user: string }) {
  let dataToResponse: {
    method: string;
    createdAt?: string;
    updatedAt?: string;
    plan: string;
  } | null = null;

  const data: User | null = await prisma.user.findUnique({
    where: {
      userId: user,
    },
  });

  if (!data) {
    throw new Error("User not found");
  }

  if (data.paymentMethod === "flutterwave") {
    try {
      const allSubscriptions = await flw.Subscription.fetch_all();
      const userSubscriptions = allSubscriptions.data.filter(
        (subscription: { customer: { customer_email: string } }) =>
          subscription.customer.customer_email === data.email
      );

      if (userSubscriptions.length === 0) {
        throw new Error("No subscriptions found for the user on Flutterwave");
      }

      userSubscriptions.sort(
        (
          a: { created_at: string | number | Date },
          b: { created_at: string | number | Date }
        ) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      const latestSubscription = userSubscriptions[0];

      dataToResponse = {
        method: data.paymentMethod,
        createdAt: latestSubscription.created_at,
        updatedAt: latestSubscription.next_payment_date,
        plan: data.plan,
      };
    } catch (error) {
      console.error("Error fetching subscriptions from Flutterwave:", error);
      throw new Error("Failed to fetch subscriptions from Flutterwave");
    }
  } else if (data.paymentMethod === "paystack") {
    try {
      const searchEmail = data.email;
      const url = "https://api.paystack.co/subscription";
      const authorization = `Bearer ${process.env.PAYSTACK_SECRET_KEY}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: authorization,
        },
      });

      const jsonData = response.data;
      const userSubscription = jsonData.data.find(
        (subscription: {
          customer: { email: string };
          createdAt: string;
          updatedAt: string;
        }) => subscription.customer.email === searchEmail
      );

      if (!userSubscription) {
        throw new Error("No subscriptions found for the user on Paystack");
      }

      dataToResponse = {
        method: data.paymentMethod,
        createdAt: userSubscription.createdAt,
        updatedAt: userSubscription.updatedAt,
        plan: data.plan,
      };
    } catch (error) {
      console.error("Error fetching subscriptions from Paystack:", error);
      throw new Error("Failed to fetch subscriptions from Paystack");
    }
  }

  if (!dataToResponse) {
    throw new Error("No subscriptions found for the user");
  }

  return { data: dataToResponse };
}
