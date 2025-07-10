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
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/Firebase/firebaseInit";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { CircleXIcon } from "lucide-react";

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
  const router = useRouter();
  let errorMessage = "";

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

    try {
      // Create new user account
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User created:", userCredential.user);

      // Success - log user information in db, then redirect to home
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        name: data.fullName,
        createdAt: new Date(),
        subscription: "free",
        email: data.email
      });

      console.log("User data saved to Firestore");

      // Success - redirect to home
      console.log("Sign up successful. Redirecting to home...");
      router.push("/");
    } catch (error) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        // Parse Firebase error messages to be more user-friendly
        errorMessage = error.message;
        if (errorMessage.includes("auth/email-already-in-use")) {
          errorMessage = "This email address is already in use.";
        } else if (errorMessage.includes("auth/invalid-email")) {
          errorMessage = "Invalid email address.";
        } else if (errorMessage.includes("auth/operation-not-allowed")) {
          errorMessage = "Email/password accounts are not enabled.";
        } else if (errorMessage.includes("auth/weak-password")) {
          errorMessage = "Password is too weak.";
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

  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);

    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error instanceof Error) {
        let errorMessage = error.message;
        if (errorMessage.includes("auth/popup-closed-by-user")) {
          errorMessage = "Sign-in was cancelled.";
        } else if (errorMessage.includes("auth/popup-blocked")) {
          errorMessage = "Pop-up was blocked. Please allow pop-ups and try again.";
        }

        form.setError("root", { message: errorMessage });
      }
      setIsSubmitting(false);
    }
  };

  return (
    <section className="h-full w-full bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4">
      <BlurFade delay={0.1}>
        <div className="w-full max-w-xl">
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

                  {/* Display form-level errors */}
                  {form.formState.errors.root && (
                    <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <CircleXIcon className="size-4 text-destructive"/>
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
                      onClick={handleGoogleSignIn}
                      disabled={isSubmitting}
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
