"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Play } from "lucide-react";
import Image from "next/image";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        router.push("/quiz");
      }} className="flex justify-between"
    >
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Are YOU ready to take on a quiz now!!!</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
              <p className="text-sm text-muted-foreground">
               Try to challenge yourself in quizes in any topics of your choice.
              </p>

              <div className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:translate-x-[3px] md:block dark:border-white w-12 mt-10">
                <Play size={28} strokeWidth={2.5} className="hover:cursor-pointer"/>
              </div>
            </div>
        </CardContent>
      </div>
      <Image
        alt="Quizz me!"
        src="/quizMe.png"
        width={160}
        height={200}
      />
    </Card>
  );
};

export default QuizMeCard;
