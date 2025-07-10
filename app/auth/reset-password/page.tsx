"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CircleXIcon, CheckCircle2 } from "lucide-react";
import { auth } from "@/lib/Firebase/firebaseInit";
import { sendPasswordResetEmail } from "firebase/auth";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await sendPasswordResetEmail(auth, data.email);
      setResetEmailSent(true);
    } catch (error) {
      console.error("Password reset error:", error);
      if (error instanceof Error) {
        let errorMessage = error.message;
        if (errorMessage.includes("auth/user-not-found")) {
          errorMessage = "No account found with this email address.";
        } else if (errorMessage.includes("auth/invalid-email")) {
          errorMessage = "Invalid email address.";
        } else if (errorMessage.includes("auth/network-request-failed")) {
          errorMessage = "Network error. Please check your connection and try again.";
        }

        form.setError("root", { message: errorMessage });
      } else {
        form.setError("root", { message: "An unknown error occurred." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-screen min-h-screen grid place-items-center">
      <section className="h-full w-full bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4">
        <BlurFade delay={0.1}>
          <div className="w-full max-w-xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-2">
                Reset Password
              </h1>
              <p className="text-muted-foreground">
                Enter your email address and we&apos;ll send you a password reset link
              </p>
            </div>

            {/* Form Card */}
            <Card className="relative overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
              <ShineBorder
                shineColor={[
                  "oklch(0.4341 0.0392 41.9938)",
                  "oklch(0.92 0.0651 74.3695)",
                ]}
              />
              <CardContent className="space-y-6">
                {resetEmailSent ? (
                  <div className="py-6">
                    <div className="flex flex-col items-center justify-center text-center space-y-4">
                      <CheckCircle2 className="size-16 text-primary" />
                      <h2 className="text-xl font-semibold">Check your email</h2>
                      <p className="text-muted-foreground max-w-md">
                        We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setResetEmailSent(false)}
                      >
                        Send another email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form
                      className="space-y-4"
                      onSubmit={(e) => {
                        if (isSubmitting) {
                          e.preventDefault();
                          return;
                        }
                        form.handleSubmit(onSubmit)(e);
                      }}
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Display form-level errors */}
                      {form.formState.errors.root && (
                        <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4 backdrop-blur-sm">
                          <div className="flex items-center gap-2">
                            <CircleXIcon className="size-4 text-destructive" />
                            <span className="font-medium">{form.formState.errors.root.message}</span>
                          </div>
                        </div>
                      )}

                      <div className="space-y-3 pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          {isSubmitting ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary font-medium hover:text-primary/80 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}
