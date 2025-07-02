import {
  BrainCircuitIcon,
  FileSearchIcon,
  ShieldXIcon,
  Zap,
} from "lucide-react";
import React from "react";
import { ShineBorder } from "./magicui/shine-border";
import { OptimizedImage } from "./ui/optimized-image";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "./magicui/blur-fade";
import { delay } from "@/lib/delay";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Hero {
  imageSrc?: string;
  imageAlt?: string;
  features?: Feature[];
  width?: number;
  height?: number;
}

const Hero = ({
  imageSrc = "/Hero.png",
  imageAlt = "placeholder",
  width = 800,
  height = 450,
  features = [
    {
      icon: <FileSearchIcon className="h-auto w-5" />,
      title: "Identify Conversion Blockers",
      description:
        "Get instant insights into what's hurting your signups, sales, or leads—and how to fix them.",
    },
    {
      icon: <Zap className="h-auto w-5" />,
      title: "Performance-Driven Suggestions",
      description:
        "Discover what's slowing your page down or causing users to leave, and get fast, actionable fixes.",
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
      <div className="container overflow-hidden px-2 md:px-14">
        <BlurFade delay={delay}>
          <div className="mb-20 flex flex-col items-center gap-6 text-center">
            <h1 className="scroll-m-20 text-center text-4xl font-bold tracking-tight text-balance">
              <span className="bg-gradient-to-t from-foreground to-foreground/30 bg-clip-text text-transparent">
                Find Conversion Rate Blockers in 10 Seconds.
              </span>
            </h1>
          </div>
        </BlurFade>
        <BlurFade delay={delay * 5}>
          <div className="relative mx-auto w-full max-w-5xl flex justify-center items-center">
            <div className="relative w-fit transform skew-x-[-22deg] transition-transform duration-300 ease-in-out hover:scale-105">
              <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary to-background blur-lg opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:blur-xl"></div>
                <div className="relative [mask-image:linear-gradient(to_bottom,white_15%,transparent_97%)]">
                  <OptimizedImage
                    src={imageSrc}
                    alt={imageAlt}
                    width={width}
                    height={height}
                    aboveFold={true}
                    quality={90}
                    className="relative max-h-[300px] md:max-h-[400px] w-auto rounded-2xl object-contain bg-background/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={delay * 10}>
          <div className="mx-auto mt-10 flex max-w-5xl flex-col md:flex-row">
            {features.map((feature, index) => (
              <React.Fragment key={feature.title}>
                {index > 0 && (
                  <Separator
                    orientation="vertical"
                    className="mx-6 hidden h-auto w-[2px] bg-linear-to-b from-muted via-transparent to-muted md:block"
                  />
                )}
                <div className="flex grow basis-0 flex-col rounded-md bg-background p-4">
                  <div className="relative mb-6 flex size-10 items-center justify-center rounded-full bg-background drop-shadow-lg">
                    <div className="absolute inset-0 rounded-full">
                      <ShineBorder
                        shineColor="var(--primary)"
                        className="!absolute"
                      />
                    </div>
                    <div className="relative z-10">{feature.icon}</div>
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export { Hero };
