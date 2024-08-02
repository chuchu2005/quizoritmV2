"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { payment } from "@/schemas/forms/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import flutterwave from "../../../public/flutterwave.png";
import paystack from "../../../public/paystack.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { startFlutterwave, startPaystack } from "@/lib/paymentFunctions";
import { ToastAction } from "../ui/toast";

type Input = z.infer<typeof payment>;

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

export function Payment() {
  const router = useRouter();
  const { toast } = useToast();
  const plan = sessionStorage.getItem("plan");
  if (!plan) {
    router.push("/");
  }
  const form = useForm<Input>({
    resolver: zodResolver(payment),
    defaultValues: {
      firstName: "Max",
      lastName: "Robertson",
      email: "roberto@example.pr",
      country: "United States",
      address: "CA 90001",
      paymentMethod: "flutterwave",
    },
  });

  const onSubmit = (data: Input) => {
    if (data.paymentMethod === "flutterwave") {
      startFlutterwave(data);
      toast({
        title: "Payment Initialize",
        description: "the payment process run now!",
      });
      if (sessionStorage.getItem("message")) {
        toast({
          title: "Payment Problem",
          description: sessionStorage.getItem("message"),
          action: (
            <ToastAction altText={"Navigate to payment"}>
              <Button onClick={() => startFlutterwave(data)}>
                Try again ?
              </Button>
            </ToastAction>
          ),
        });
      }
    } else if (data.paymentMethod === "paystack") {
      startPaystack(data);
      toast({
        title: "Payment Initialize",
        description: "the payment process run now!",
      });
      if (sessionStorage.getItem("message")) {
        toast({
          title: "Payment Problem",
          description: sessionStorage.getItem("message"),
          action: (
            <ToastAction altText={"Navigate to payment"}>
              <Button onClick={() => startPaystack(data)}>Try again ?</Button>
            </ToastAction>
          ),
        });
      }
    }
  };

  form.watch();

  return (
    <Card className="mx-auto max-w-sm mb-20">
      <CardHeader>
        <CardTitle className="text-xl">
          Pay for : {plan} Plan{" "}
          {plan === "Monthly" ? 2 : plan === "Yearly" && 10} {""} $
        </CardTitle>
        <CardDescription>
          Choose the payment process informations :
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Payment Buttons */}
            <div className="flex h-24 items-center gap-x-10 px-5">
              <div className="flex flex-col w-1/2 h-full gap-1 text-center">
                <p className="text-sm">Flutterwave</p>
                <Button
                  variant={
                    form.getValues("paymentMethod") === "flutterwave"
                      ? "default"
                      : "secondary"
                  }
                  className="h-full rounded-lg"
                  onClick={() => form.setValue("paymentMethod", "flutterwave")}
                  type="button"
                >
                  <Image
                    src={flutterwave}
                    alt="flutterwave"
                    width={50}
                    height={50}
                  />
                </Button>
              </div>
              <div className="flex flex-col gap-1 h-full w-1/2 text-center">
                <p className="text-sm">Paystack</p>
                <Button
                  variant={
                    form.getValues("paymentMethod") === "paystack"
                      ? "default"
                      : "secondary"
                  }
                  className="h-full rounded-lg"
                  onClick={() => form.setValue("paymentMethod", "paystack")}
                  type="button"
                >
                  <Image
                    src={paystack}
                    alt="flutterwave"
                    width={50}
                    height={50}
                  />
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    aria-required
                    id="first"
                    placeholder="Max"
                    required
                    {...form.register("firstName")}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last"
                    placeholder="Robinson"
                    required
                    {...form.register("lastName")}
                  />
                </div>
              </div>

              {/* email Field */}

              <div>
                <Label htmlFor="first-name">Email</Label>
                <Input
                  aria-required
                  id="email"
                  type="email"
                  placeholder="Max"
                  required
                  {...form.register("email")}
                />
              </div>

              {/* Country Select Field */}
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="United States">
                            United States
                          </SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Mexico">Mexico</SelectItem>
                          <SelectItem value="Brazil">Brazil</SelectItem>
                          <SelectItem value="United Kingdom">
                            United Kingdom
                          </SelectItem>
                          <SelectItem value="France">France</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="Italy">Italy</SelectItem>
                          <SelectItem value="Spain">Spain</SelectItem>
                          <SelectItem value="China">China</SelectItem>
                          <SelectItem value="Japan">Japan</SelectItem>
                          <SelectItem value="South Korea">
                            South Korea
                          </SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="New Zealand">
                            New Zealand
                          </SelectItem>
                          <SelectItem value="South Africa">
                            South Africa
                          </SelectItem>
                          <SelectItem value="Russia">Russia</SelectItem>
                          <SelectItem value="Turkey">Turkey</SelectItem>
                          <SelectItem value="Netherlands">
                            Netherlands
                          </SelectItem>
                          <SelectItem value="Sweden">Sweden</SelectItem>
                          <SelectItem value="Norway">Norway</SelectItem>
                          <SelectItem value="Denmark">Denmark</SelectItem>
                          <SelectItem value="Finland">Finland</SelectItem>
                          <SelectItem value="Poland">Poland</SelectItem>
                          <SelectItem value="Hungary">Hungary</SelectItem>
                          <SelectItem value="Romania">Romania</SelectItem>
                          <SelectItem value="Greece">Greece</SelectItem>
                          <SelectItem value="Israel">Israel</SelectItem>
                          <SelectItem value="Thailand">Thailand</SelectItem>
                          <SelectItem value="Vietnam">Vietnam</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              {/* Address Field */}
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  type="text"
                  aria-required
                  {...form.register("address")}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full mt-4"
            >
              Pay
            </Button>

            {/* Refund Policy Link */}
            <div className="mt-4 text-center text-sm">
              Refund{" "}
              <Link href="aiteacher.learnrithm.com/refund" className="underline">
                Policies
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
