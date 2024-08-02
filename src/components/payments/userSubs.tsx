"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface PaymentData {
  method: string;
  createdAt?: string;
  updatedAt?: string;
  plan: string;
}

export default function UserSubs({ userId }: any) {
  const [data, setData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(userId: string) {
      await axios
        .post("/api/getDetails", { userId })
        .then((data) => {
          setData(data.data.data.data);
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mb-20 max-w-4xl w-full px-3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Subscriptions</CardTitle>
          <CardDescription>
            Here you can manage your subscription details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 mt-10">
            <p className="text-base font-semibold">
              Subscription Plan: {data ? data.plan : "Hobby Plan"}
            </p>
            {data ? (
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-semibold">
                  Subscription Method: {data.method}
                </p>
                <div className="flex gap-x-4 items-center">
                  <p>Subscreption is: </p>
                  <div className="size-5 bg-emerald-700 rounded-full">
                  </div>
                </div>
                <p className="text-base font-semibold">
                  Subscription Created at: {data.createdAt}
                </p>
                <p className="text-base font-semibold">
                  Subscription Updated at: {data.updatedAt}
                </p>
                <p className="text-lg font-bold -ml-4">Operations</p>
                <p className="text-base font-semibold flex items-center">
                  Update to yearly plan:
                  <Link href={"/payment"}>
                    <Button
                      className="ml-4 flex items-center gap-x-2"
                      onClick={() => {
                        sessionStorage.setItem("plan", "Yearly");
                      }}
                    >
                      <p>Update</p>
                      <ExternalLink />
                    </Button>
                  </Link>
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                <p className="text-base font-semibold flex items-center">
                  Update to Get More Features:
                  <Link href={"/pricing"}>
                    <Button className="ml-4 flex items-center gap-x-2">
                      <p>Update</p>
                      <ExternalLink />
                    </Button>
                  </Link>
                </p>
                <p className="text-lg font-bold">Reduced Features</p>
                <div className="flex flex-col gap-y-2">
                  <p>No language feature</p>
                  <p>Can only create 3 quizzes</p>
                  <p>Can only generate 10 questions</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
