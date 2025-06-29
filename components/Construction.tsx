import React from "react";
import { BlurFade } from "./magicui/blur-fade";
import { ConstructionIcon } from "lucide-react";
import { TypingAnimation } from "./magicui/typing-animation";
import { TextEffect } from "./motion-primitives/text-effect";

const Construction: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <div className="flex items-center justify-around gap-5 min-w-3xl">
        <ConstructionIcon height={70} width={70} />
        <TypingAnimation as="h1" delay={0}>
          Under Construction
        </TypingAnimation>
        <ConstructionIcon height={70} width={70} />
      </div>
      <TextEffect per="char" delay={3}>
        We're working hard to bring this page to life. Please check back soon!
      </TextEffect>
    </div>
  );
};

export default Construction;
