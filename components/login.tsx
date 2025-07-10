"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BlurFade } from "@/components/magicui/blur-fade";
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
import { auth, db } from "@/lib/Firebase/firebaseInit";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CircleXIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

interface LoginProps {
  heading?: string;
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  password: z.string().min(1, "Password is required"),
});

const Login = ({
  heading = "Welcome back",
  buttonText = "Sign in to your account",
  googleText = "Continue with Google",
  signupText = "Don't have an account?",
  signupUrl = "/auth/signup",
}: LoginProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log("Current Auth State: ", auth);

      // Success - redirect to home
      console.log("Sign in successful. Redirecting to home...");
      router.push("/");

    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        // Parse Firebase error messages to be more user-friendly
        let errorMessage = error.message;
        if (errorMessage.includes("auth/user-not-found")) {
          errorMessage = "No account found with this email address.";
        } else if (errorMessage.includes("auth/wrong-password")) {
          errorMessage = "Incorrect password.";
        } else if (errorMessage.includes("auth/invalid-credential")) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else if (errorMessage.includes("auth/invalid-email")) {
          errorMessage = "Invalid email address.";
        } else if (errorMessage.includes("auth/too-many-requests")) {
          errorMessage = "Too many failed attempts. Please try again later.";
        } else if (errorMessage.includes("auth/user-disabled")) {
          errorMessage = "This account has been disabled.";
        } else if (errorMessage.includes("auth/network-request-failed")) {
          errorMessage = "Network error. Please check your connection and try again.";
        }

        form.setError("root", { message: errorMessage });
      } else {
        form.setError("root", { message: "An unknown error occurred." });
      }
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const provider = new GoogleAuthProvider();
      // Add scopes for better user data
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);

      if (result && result.user) {
        console.log("Google sign-in successful:", result.user);

        // Check if user already exists in the database
        const userQuery = query(
          collection(db, "users"),
          where("uid", "==", result.user.uid)
        );
        const userDocs = await getDocs(userQuery);

        if (userDocs.empty) {
          // Save user data to Firestore if this is a new user
          await addDoc(collection(db, "users"), {
            uid: result.user.uid,
            name: result.user.displayName || "Google User",
            createdAt: new Date(),
            subscription: "free",
            email: result.user.email,
          });
          console.log("Google user data saved to Firestore");
        } else {
          console.log("Existing Google user logged in");
        }

        // Redirect to home page
        console.log("Google sign-in successful. Redirecting to home...");
        router.push("/");
      }
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
              Access your PageSense dashboard and audit history
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
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/auth/forgot-password"
                            className="text-sm text-primary hover:text-primary/80 transition-colors"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="Enter your password"
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
                      {isSubmitting ? "Signing in..." : buttonText}
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
                      onClick={() => handleGoogleSignIn()}
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
              {signupText}{" "}
              <Link
                href={signupUrl}
                className="text-primary font-medium hover:text-primary/80 transition-colors"
              >
                Create account
              </Link>
            </p>
            <p className="text-muted-foreground text-xs mt-4">
              By signing in, you agree to our{" "}
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
            </p>
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export { Login };
