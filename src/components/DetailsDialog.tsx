"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import Image from "next/image";

type Props = {};

const DetailsDialog = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className="flex items-center px-2 py-1 text-white rounded-md bg-slate-800">
          What is this
          <HelpCircle className="w-5 h-5 ml-1" />
        </span>
      </DialogTrigger>
      <DialogContent className="w-[70vw] max-w-[100vw] md:w-[50vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl">QUIZORITHM</DialogTitle>
          <DialogDescription>
            <p className="my-2 text-xs">
              Are you tired of mundane and repetitive quizzes? Say goodbye to
              the ordinary and embrace the extraordinary with Quizorithm! Our
              platform is revolutionizing the quiz and trivia experience by
              harnessing the immense potential of artificial intelligence.
            </p>
            <hr />
            <p className="my-2 font-semibold">
              <h4 className="text-base font-semibold">Built with</h4>
              <div className="grid justify-around grid-cols-2 lg:grid-cols-4 mt-2 gap-y-3 text-xs">
                <div className="flex items-center">
                  <Image
                    alt="cockroachDB"
                    src="/cockroachDB.png"
                    width={35}
                    height={35}
                  />
                  <span className="">CockroachDB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="nextjs"
                    src="/nextjs.png"
                    width={35}
                    height={35}
                  />
                  <span className="">Next.js</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="tailwind"
                    src="/tailwind.png"
                    width={35}
                    height={35}
                  />
                  <span className="">Tailwind</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="Clerk"
                    src="/clerk.png"
                    width={30}
                    height={30}
                  />
                  <span className="">Clerk</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="Gemini AI"
                    src="/GeminiAI.png"
                    width={30}
                    height={15}
                  />
                  <span className="">Gemini AI</span>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    alt="react query"
                    src="/react-query.png"
                    width={30}
                    height={30}
                  />
                  <span className="">React Query</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="primsa"
                    src="/prisma.png"
                    width={30}
                    height={30}
                  />
                  <span className="">Prisma</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image
                    alt="typescript"
                    src="/typescript.png"
                    width={30}
                    height={30}
                  />
                  <span className="">TypeScript</span>
                </div>
              </div>
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
