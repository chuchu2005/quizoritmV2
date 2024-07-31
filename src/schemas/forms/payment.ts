import { z } from "zod";

export const payment = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "PLease inculd your first name",
    })
    .max(20, {
      message: "first name must be at most 20 characters long",
    }),
  lastName: z.string(),
    email: z.string(),
  country: z.enum([
    "United States",
    "Canada",
    "Mexico",
    "Brazil",
    "United Kingdom",
    "France",
    "Germany",
    "Italy",
    "Spain",
    "China",
    "Japan",
    "South Korea",
    "India",
    "Australia",
    "New Zealand",
    "South Africa",
    "Russia",
    "Turkey",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Poland",
    "Hungary",
    "Romania",
    "Greece",
    "Israel",
    "Thailand",
    "Vietnam",
  ]),
  address: z.string(),
  paymentMethod: z.enum(["flutterwave", "paystack"]),
});
