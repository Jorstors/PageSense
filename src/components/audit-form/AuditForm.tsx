import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import {
  SendHorizontal,
  ChevronRightIcon,
  CheckIcon,
  MailWarning,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  url: z.string().url().max(255),
  email: z.string().email().max(255),
});

export function AuditForm() {
  const [sent, setSent] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      email: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Example: send data to an API endpoint
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      // Optionally handle response data
      // const result = await response.json();

      toast("Email sent!", {
        icon: <SendHorizontal />,
      });
      setSent(true);
    } catch (error) {
      toast("Failed to send email.", {
        icon: <MailWarning />,
      });
      setSent(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        onChange={() => {
          setSent(false);
        }}
        className=" w-fit h-fit mx-auto"
      >
        <Card className="space-y-3 relative overflow-hidden w-115">
          <ShineBorder
            shineColor={[
              "oklch(0.4341 0.0392 41.9938)",
              "oklch(0.92 0.0651 74.3695)",
            ]}
          />
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What to audit</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Where to send it</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <AnimatedSubscribeButton
              type="submit"
              subscribeStatus={sent}
              disabled={sent}
              className={`w-36`}
            >
              <span className="group inline-flex items-center">
                Email
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Sent!
              </span>
            </AnimatedSubscribeButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
