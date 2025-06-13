import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Loader2Icon,
} from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  url: z.string().url().max(255),
  email: z.string().email().max(255),
  subscribe: z.boolean(),
});

export function AuditForm() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
      email: "",
      subscribe: false,
    },
  });

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isSubmitting) return; // <-- block immediately
    setIsSubmitting(true);

    console.log(data);

    // Show loader toast
    await toast.promise(
      (async () => {
        // Send data to API endpoint
        const response = await fetch("/api/audit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        let errorMsg = "";

        if (response.headers.get("content-type")?.includes("application/json")) {
          const json = await response.json();
          if (json.error) {
            errorMsg = json.error;
            throw new Error(errorMsg);
          }
        } else if (!response.ok) {
          errorMsg = "Failed to send data";
          throw new Error(errorMsg);
        }

        // handle response data
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        // Open PDF in another window
        const a = document.createElement("a");
        a.href = url;
        // Dynamic download name
        a.download = `audit-${data.url
          .replace(/https?:\/\//, "")
          .replace(/\//g, "-")}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        // Successfully downloaded and sent audit
        setSent(true);

        // Reset form state
        setIsSubmitting(false);
      })(),
      {
        position: "top-center",
        loading: "Sending...",
        success: (
          <div className="pl-2">
            <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>
              Audit sent!
            </div>
            <div style={{ fontSize: "0.95em", color: "#666" }}>
              Sent to your email & your downloads folder.
            </div>
          </div>
        ),
        error: (err: any) => <>{err.message}</>,
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          // If already submitting, prevent further submissions
          if (isSubmitting) {
            e.preventDefault();
            return;
          }
          // Otherwise, continue
          form.handleSubmit(onFormSubmit)(e);
        }}
        onChange={() => {
          setSent(false);
        }}
        className=" w-fit h-fit mx-auto"
      >
        <Card className="space-y-5 relative overflow-hidden w-115">
          <ShineBorder
            shineColor={[
              "oklch(0.4341 0.0392 41.9938)",
              "oklch(0.92 0.0651 74.3695)",
            ]}
          />
          <CardContent className="space-y-8">
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
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3">
                    <FormControl>
                      <Checkbox
                        {...field}
                        type="button"
                        id="subscribe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label htmlFor="subscribe">
                      Yes, I’d like to receive 3 follow-up tips
                    </Label>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <AnimatedSubscribeButton
              type="submit"
              subscribeStatus={sent}
              disabled={sent || isSubmitting}
              className={"w-36 active:scale-95"}
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
