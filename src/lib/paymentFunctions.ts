import { payment } from "@/schemas/forms/payment";
import axios from "axios";
import { z } from "zod";

type Input = z.infer<typeof payment>;

//Flutterwave plan id:
const flutterwavePlanIdMonthly = "124721";
const flutterwavePlanIdYearly = "124723";

//Paystack plan id:
const paystackPlanIdOne = "PLN_gsx9r9hlakt1lp3";
const paystackPlanIdTwo = "PLN_fy2fwmvqy3z0ffl";

//Price for both:
const priceMonthly = 2;
const priceYearly = 10;

//Get plan
const plan = sessionStorage.getItem("plan");

export async function startFlutterwave(data: Input) {
  // Conditionally get the props
  let planId = flutterwavePlanIdYearly;
  let price = priceYearly;
  if (plan === "Monthly") {
    planId = flutterwavePlanIdMonthly;
    price = priceMonthly;
  }

  sessionStorage.setItem("method", "flutterwave");
  sessionStorage.setItem("plan", plan ? plan : "Monthly");

  try {
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.FlutterwaveCheckout) {
        window.FlutterwaveCheckout({
          public_key: `${process.env.FLUTTERWAVE_PUBLIC_KEY}`,
          tx_ref: Date.now() + data.country,
          amount: price,
          payment_plan: planId,
          currency: "USD",
          redirect_url: "/success",
          payment_options: "card",
          enckey: `${process.env.FLUTTERWAVE_ENC_KEY}`,
          customer: {
            email: data.email,
            name: `${data.firstName}, ${data.lastName}`,
          },
          callback: async function () {
            await axios.post("/api/payment");
          },
          onclose: function () {
            sessionStorage.setItem('message', 'user have closed the payment process');
          },
          customizations: {
            title: "Learnrithm - Quiz Feature",
            description: "Pay for your plan of cost:",
            logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/payment-2193968-1855546.png",
          },
        });
      } else {
      }
    };

    script.onerror = () => {
    };
  } catch (error) {
    return { message: `Payment initialize: ${error}` };
  }
  return;
}

export async function startPaystack(data: Input) {
  // Conditionally get the props
  let planId = paystackPlanIdTwo;
  let amountInZar = priceYearly.toString();
  if (plan === "Monthly Plan") {
    planId = paystackPlanIdOne;
    amountInZar = priceMonthly.toString();
  }

  const dataToSend = {
    email: data.email,
    amount: amountInZar,
    plan: planId,
  };

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      dataToSend,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.status) {
      return { status: 500, message: "Paystack initialization failed" };
    }

    sessionStorage.setItem("method", "paystack");
    sessionStorage.setItem("plan", plan ? plan : "Monthly");
    window.location.href = response.data.data.data.authorization_url;
  } catch (error) {
    return { message: `Payment initialize: ${error}` };
  }
}