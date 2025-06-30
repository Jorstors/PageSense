import {
  BrainCircuitIcon,
  FileSearchIcon,
  ShieldXIcon,
  Zap,
} from "lucide-react";
import React from "react";
import { ShineBorder } from "./magicui/shine-border";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Hero {
  imageSrc?: string;
  imageAlt?: string;
  features?: Feature[];
}

const Hero = ({
  imageSrc = "/Hero.png",
  imageAlt = "placeholder",
  features = [
    {
      icon: <FileSearchIcon className="h-auto w-5" />,
      title: "Identify Conversion Blockers",
      description:
        "Get instant insights into what’s hurting your signups, sales, or leads—and how to fix them.",
    },
    {
      icon: <Zap className="h-auto w-5" />,
      title: "Performance-Driven Suggestions",
      description:
        "Discover what’s slowing your page down or causing users to leave, and get fast, actionable fixes.",
    },
    {
      icon: <BrainCircuitIcon className="h-auto w-5" />,
      title: "AI-Powered Recommendations",
      description:
        "Backed by real-world data from high-performing pages, our AI tells you exactly what to improve.",
    },
    {
      icon: <ShieldXIcon className="h-auto w-5" />,
      title: "Lower Bounce Rates",
      description:
        "Keep more visitors engaged by improving clarity, structure, and mobile-friendliness.",
    },
  ],
}: Hero) => {
  return (
    <section className="py-20">
      <div className="container overflow-hidden">
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
            Find Conversion Rate Blockers in{" "}
            <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-current after:transition-all after:duration-300 after:w-full">
              10 Seconds.
            </span>
          </h1>
        </div>

        <div className="relative mx-auto max-w-5xl w-fit shadow-xl shadow-white">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary to-background blur-lg"></div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            className="relative max-h-[300px] md:max-h-[400px] w-fit mx-auto rounded-2xl object-contain bg-white shadow-white shadow-2xl"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
          {features.map((feature, index) => (
            <React.Fragment key={feature.title}>
              {index > 0 && (
                <Separator
                  orientation="vertical"
                  className="mx-6 hidden h-auto w-[2px] bg-linear-to-b from-muted via-transparent to-muted md:block"
                />
              )}
              <div
                key={index}
                className="flex grow basis-0 flex-col rounded-md bg-background p-4"
              >
                <div className="mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                  <ShineBorder shineColor="var(--primary)" />
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Hero };
