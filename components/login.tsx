"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ShineBorder } from "@/components/magicui/shine-border";
import { BlurFade } from "@/components/magicui/blur-fade";
import Link from "next/link";

interface LoginProps {
  heading?: string;
  logo: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const Login = ({
  heading = "Welcome back",
  logo = {
    url: "/",
    src: "/WOB-Big.png",
    alt: "PageSense logo",
    title: "PageSense",
  },
  buttonText = "Sign in to your account",
  googleText = "Continue with Google",
  signupText = "Don't have an account?",
  signupUrl = "/auth/signup",
}: LoginProps) => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 flex items-center justify-center p-4">
      <BlurFade delay={0.1}>
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
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
            <CardHeader className="text-center pb-4">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {buttonText}
                  </Button>

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
          </div>
        </div>
      </BlurFade>
    </section>
  );
};

export { Login };
