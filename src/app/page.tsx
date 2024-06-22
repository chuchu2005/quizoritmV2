import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const metadata = {
  title: "Home | Learnrithm",
  description: "Quiz yourself on anything!",
};

export default async function Home() {
  const { userId } = auth();
  return (
    <div className="max-h-screen"> 
      <Card className="w-[300px] fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <CardHeader>
          <CardTitle>Welcome to Learnrithm 🔥!</CardTitle>
          <CardDescription>
            Learnrithm is a platform for creating quizzes using AI!.
          </CardDescription>
        </CardHeader>
        {userId ? (
          <CardContent>
            <Button variant="secondary">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        ) : (
          <CardContent className="flex gap-3">
            <Button>
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}