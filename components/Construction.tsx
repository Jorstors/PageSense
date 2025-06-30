import React from "react";
import { ChevronRightIcon, ConstructionIcon } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import { BlurFade } from "./magicui/blur-fade";
import { TextEffect } from "./motion-primitives/text-effect";
import { Button } from "./ui/button";
import Link from "next/link";

const Construction: React.FC = () => {
  return (
    <div className="text-center p-12 w-lg lg:w-3xl text-xs md:text-base grid place-items-center">
      <div className="inline-flex gap-5 w-fit">
        <BlurFade delay={2} duration={1}>
          <ConstructionIcon size={60} />
        </BlurFade>
        <TypingAnimation as="h1" delay={0}>
          Under Construction
        </TypingAnimation>
        <BlurFade delay={2} duration={1}>
          <ConstructionIcon size={60} />
        </BlurFade>
      </div>
      <TextEffect per="char" delay={3} className="my-5">
        We&apos;re working hard to bring this page to life. Please check back
        soon!
      </TextEffect>
      <Link href="/tool">
        <Button className="mt-5">
          Go to Tool <ChevronRightIcon />
        </Button>
      </Link>
    </div>
  );
};

export default Construction;
