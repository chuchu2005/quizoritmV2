import { z } from "zod";
export const metadata: Metadata = {
  title: "Learnrithm AI Quiz",
  description: "Learnrithm AI Quiz | Learning Doesnt Have To Be Hard",
  // other metadata
};
export const getQuestionsSchema = z.object({
  topic: z.string(),
  amount: z.number().int().positive().min(1).max(10),
  type: z.enum(["mcq", "open_ended"]),
});

export const checkAnswerSchema = z.object({
  userInput: z.string(),
  questionId: z.string(),
});

export const endGameSchema = z.object({
  gameId: z.string(),
});
