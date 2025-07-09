"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface SignupProps {
  heading?: string;
  signupText?: string;
  googleText?: string;
  loginText?: string;
  loginUrl?: string;
}

const FormSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address").max(255, "Email too long"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const Signup = ({
  heading = "Create your account",
  googleText = "Continue with Google",
  signupText = "Create account",
  loginText = "Already have an account?",
  loginUrl = "/auth/login",
}: SignupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isSubmitting) return; // <-- block immediately
    setIsSubmitting(true);

    console.log(data);

    // Send data to API endpoint
    setTimeout(() => {
      console.log("Form submitted");
      // Reenable Form Submission
      setIsSubmitting(false);
    }, 1000)


  };

  return (
    <section className="h-full bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4">
      <BlurFade delay={0.1}>
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent pb-2">
              {heading}
            </h1>
            <p className="text-muted-foreground">
              Start auditing your website&apos;s SEO performance
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
              <Form {...form}>
                <form
                  className="space-y-4"
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
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                          />
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
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 pt-2">
                          <FormControl>
                            <Checkbox
                              id="terms"
                              className="border-border/50"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label
                            htmlFor="terms"
                            className="text-sm text-muted-foreground leading-none"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-primary hover:text-primary/80 transition-colors"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? "Creating account..." : signupText}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border/50" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-border/50 hover:bg-muted/50 transition-colors"
                      type="button"
                    >
                      <FcGoogle className="mr-2 size-5" />
                      {googleText}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              {loginText}{" "}
              <Link
                href={loginUrl}
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export { Signup };
