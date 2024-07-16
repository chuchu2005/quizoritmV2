import { z } from "zod";
export const metadata: Metadata = {
  title: "Learnrithm AI Quiz",
  description: "Learnrithm AI Quiz | Learning Doesnt Have To Be Hard",
  // other metadata
};
export const quizCreationSchema = z.object({
  topic: z
    .string()
    .min(4, {
      message: "Topic must be at least 4 characters long",
    })
    .max(50, {
      message: "Topic must be at most 50 characters long",
    }),
  type: z.enum(["mcq", "open_ended"]),
  amount: z.number().min(1).max(10),
});
