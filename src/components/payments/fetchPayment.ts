import { prisma } from "@/lib/db";
import axios from "axios";
import { addMonths, format } from "date-fns";
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

interface Subscription {
  id: number;
  amount: number;
  customer: object;
  plan: string;
  status: string;
  created_at: string;
  next_payment_date?: string; // Assuming this field exists in the real response
}

interface FlwResponse {
  status: string;
  message: string;
  meta: {
    page_info: { total: number; current_page: number; total_pages: number };
  };
  data: Subscription[];
}

export async function fetchPayment({ user }: { user: string }) {
  let dataToResponse: {
    status: number;
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
      const allSubscriptions: FlwResponse = await flw.Subscription.fetch_all();
      // Filter active subscriptions
      const activeSubscriptions = allSubscriptions.data.filter(
        (subscription) => subscription.status === "active"
      );

      // Sort by created_at date in descending order and get the latest one
      const latestSubscription = activeSubscriptions.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

      let nextBillingDate = addMonths(
        new Date(latestSubscription.created_at),
        1
      );
      if (data.plan === "Yearly Plan") {
        nextBillingDate = addMonths(
          new Date(latestSubscription.created_at),
          12
        );
      }

      // Format the dates to yyyy-mm-dd
      const formattedCreatedAt = format(
        new Date(latestSubscription.created_at),
        "yyyy-MM-dd"
      );
      const formattedNextBillingDate = format(nextBillingDate, "yyyy-MM-dd");

      dataToResponse = {
        status: 200,
        method: data.paymentMethod,
        createdAt: formattedCreatedAt,
        updatedAt: formattedNextBillingDate,
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
        status: 200,
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

  if (dataToResponse) {
    return { data: dataToResponse };
  } else {
    return {
      status: 404,
      message: "The user is i the free plan",
      plan: "hobby",
    };
  }
}
