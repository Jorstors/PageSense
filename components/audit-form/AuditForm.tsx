"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
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
import { ChevronRightIcon, CheckIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  url: z.string().url().max(255),
  email: z.string().email().max(255),
  subscribe: z.boolean(),
});

export function AuditForm({ className }: { className?: string }) {
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

        if (
          response.headers.get("content-type")?.includes("application/json")
        ) {
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
      })().finally(() => {
        setIsSubmitting(false);
      }),
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
        error: (err) => <span>{err.message}</span>,
      }
    );
  };

  return (
    <Card className={`container px-2 md:px-14 h-fit mx-auto py-10 grid place-items-center relative ${className}`}>

      <Form {...form}>
        <form
          className="w-full h-full"
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
        >
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What to audit</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the URL" {...field} required />
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
                      <Input placeholder="Enter your email" {...field} required />
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
              <AnimatedSubscribeButton
                type="submit"
                subscribeStatus={sent}
                disabled={sent || isSubmitting}
                className={`w-36 active:scale-95 ${isSubmitting && " bg-primary/85" }`}
              >
                <span className="group inline-flex items-center">
                  {isSubmitting ? (
                      <span className="flex items-center gap-2 font-medium">
                      <Loader2Icon className="size-4 animate-spin" />
                      <span className="font-medium tracking-wide">Sending...</span>
                      </span>
                  ) : (
                      <span className="flex items-center gap-2 font-medium">
                      <span>Email</span>
                      <ChevronRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                  )}
                </span>
                <span className="group inline-flex items-center">
                  <CheckIcon className="mr-2 size-4" />
                  Sent!
                </span>
              </AnimatedSubscribeButton>


            </CardContent>
        </form>
      </Form>

      <ShineBorder
              shineColor={[
                "oklch(0.4341 0.0392 41.9938)",
                "oklch(0.92 0.0651 74.3695)",
              ]}
            />
    </Card>
  );
}
