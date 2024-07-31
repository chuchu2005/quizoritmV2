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
    if (userId) {
      fetch(`/api/getDetails?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Payment data fetched:", data);
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching payment data:", error);
        })
        .finally(() => {
          setLoading(false);
        });
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
              <div>
                <p className="text-base font-semibold">
                  Subscription Method: {data.method}
                </p>
                <p className="text-base font-semibold">
                  Subscription Created at: {data.createdAt}
                </p>
                <p className="text-base font-semibold">
                  Subscription Updated at: {data.updatedAt}
                </p>
                <p className="text-lg font-bold -ml-4">Operations</p>
                <p className="text-base font-semibold flex items-center">
                  Update to yearly plan:
                  <Link href={"/payment"}></Link>
                  <Button
                    className="ml-4 flex items-center gap-x-2"
                    onClick={() => {
                      sessionStorage.setItem("plan", "Yearly");
                    }}
                  >
                    <p>Update</p>
                    <ExternalLink />
                  </Button>
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-y-5">
                <p className="text-base font-semibold flex items-center">
                  Update to Get More Features:
                  <Link href={"/pricing"}></Link>
                  <Button className="ml-4 flex items-center gap-x-2">
                    <p>Update</p>
                    <ExternalLink />
                  </Button>
                </p>
                <p className="text-lg font-bold">Reduced Features</p>
                <div className="flex flex-col gap-y-2">
                  <p>Reduced Feature 4</p>
                  <p>Reduced Feature 1</p>
                  <p>Reduced Feature 3</p>
                  <p>Reduced Feature 2</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
