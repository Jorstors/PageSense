import React from "react";
import { ChevronRightIcon } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import { TextEffect } from "./motion-primitives/text-effect";
import { Button } from "./ui/button";
import Link from "next/link";

const Construction: React.FC = () => {
  return (
    <div className="text-center p-12 w-lg lg:w-3xl">
      <div className="flex items-center justify-around gap-5 w-full">
        <TypingAnimation as="h1" delay={0}>
          🚧Under Construction🚧
        </TypingAnimation>
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
