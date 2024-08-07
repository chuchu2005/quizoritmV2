"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  userId: string;
};

const QuizMeCard = ({ userId }: Props) => {
  const router = useRouter();
  const [canPlay, setCanPlay] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchAvailable(userId: string) {
      await axios
        .post("/api/verify", { userId })
        .then((response) => {
          if (response.data.isUnderLimit === true) {
            setCanPlay(true);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });
    }
    if (userId) {
      fetchAvailable(userId);
    } else {
      router.push("/");
    }
  }, [userId, router]);

  const handleClick = () => {
    if (canPlay) {
      router.push("/quiz");
    } else {
      toast({
        title: "Quiz Ai",
        description:
          "You exceed the number of tries please subscribe to get unlimited features",
        action: (
          <ToastAction altText={"Navigate to payment"}>
            <Link href="/pricing">
              <Button>Subscribe Now!</Button>
            </Link>
          </ToastAction>
        ),
      });
    }
  };

  return (
    <Card onClick={handleClick} className="flex justify-between">
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            Are YOU ready to take on a quiz now!!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-sm text-muted-foreground">
              Try to challenge yourself in quizzes on any topic of your choice.
            </p>

            <div className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:translate-x-[3px] md:block dark:border-white w-12 mt-10">
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <Play
                  size={28}
                  strokeWidth={2.5}
                  className="hover:cursor-pointer"
                />
              )}
            </div>
          </div>
        </CardContent>
      </div>
      <Image alt="Quiz me!" src="/quizMe.png" width={160} height={200} />
    </Card>
  );
};

export default QuizMeCard;
