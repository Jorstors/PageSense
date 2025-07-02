import { Button } from "@/components/ui/button";
import HeroVideoDialog from "./magicui/hero-video-dialog";
import Image from "next/image";
import { delay } from "@/lib/delay";
import { BlurFade } from "./magicui/blur-fade";

interface AboutProps {
  title?: string;
  description?: string;
  mainVideo?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultCompanies = [
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    alt: "React",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
    alt: "Next.js",
  },
  {
    src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    alt: "TypeScript",
  },
  {
    src: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    alt: "Tailwind CSS",
  },
  {
    src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
    alt: "Firebase",
  },
  {
    src: "https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg",
    alt: "Google Cloud Platform",
  },
];

const defaultAchievements = [
  { label: "Page Speed Insights", value: "15+" },
  { label: "WCAG Guidelines", value: "85+" },
  { label: "UX Metrics Tracked", value: "25+" },
  { label: "Analysis Points", value: "200+" },
];

const About = ({
  title = "About Pagesense",
  description = "Pagesense is an AI-powered tool that analyzes website performance, accessibility, and user experience in real-time. Our technology helps identify conversion bottlenecks and provides actionable recommendations.",
  mainVideo = {
    src: "/pagesensedemo.mp4",
    thumb: "/pagesensestill.png",
    alt: "Pagesense dashboard preview",
  },
  secondaryImage = {
    src: "/Title-WOB.png",
    alt: "Pagesense logo",
  },
  breakout = {
    src: "/WOB-Big.png",
    alt: "Pagesense logo light",
    title: "Instant Website Analysis",
    description:
      "Our AI engine analyzes your website's key metrics including load time, accessibility compliance, and user interaction patterns to identify improvement opportunities.",
    buttonText: "Try it now",
    buttonUrl: "/tool",
  },
  companiesTitle = "Built with modern technologies",
  companies = defaultCompanies,
  achievementsTitle = "Comprehensive Analysis Coverage",
  achievementsDescription = "Pagesense provides detailed insights across multiple aspects of your website's performance and user experience.",
  achievements = defaultAchievements,
}: AboutProps = {}) => {
  return (
    <section className="py-20">
      <div className="container px-2 md:px-14">
        <BlurFade delay={delay}>
          <div className="mb-20 grid gap-8 text-center md:grid-cols-2 md:text-left">
            <h1 className="text-5xl font-semibold tracking-tight leading-[1.15] bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 min-h-20">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          </div>
        </BlurFade>
        <BlurFade delay={delay * 5}>
          <div className="grid gap-10 lg:grid-cols-3 mb-32">
            <HeroVideoDialog
              videoSrc={mainVideo.src}
              thumbnailSrc={mainVideo.thumb}
              thumbnailAlt={secondaryImage.alt}
              animationStyle="top-in-bottom-out"
              className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2 shadow-lg"
            />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col justify-between gap-8 rounded-xl bg-muted/50 backdrop-blur-sm p-8 lg:w-1/2 xl:w-auto border border-border/50">
                <div className="mr-auto h-12">
                  <Image
                    src={breakout.src}
                    alt={breakout.alt}
                    width={50}
                    height={50}
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-xl font-semibold tracking-tight">
                    {breakout.title}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {breakout.description}
                  </p>
                </div>
                <Button variant="outline" className="mr-auto" asChild>
                  <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
                </Button>
              </div>
              <div className="grow basis-0 rounded-xl md:w-auto h-15 md:h-13 lg:w-auto object-contain bg-muted/50 p-4">
                <Image
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  width={140}
                  height={20}
                  className="m-auto"
                />
              </div>
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={delay * 10}>
          <div className="py-10 space-y-12">
            <p className="text-2xl font-medium text-center tracking-tight">
              {companiesTitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-12">
              {companies.map((company, idx) => (
                <div
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                  key={company.src + idx}
                >
                  <div className="h-8 w-auto md:h-10">
                    <Image
                      src={company.src}
                      alt={company.alt}
                      width={35}
                      height={35}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
        <BlurFade delay={delay * 15}>
          <div className="relative overflow-hidden rounded-xl bg-muted/50 backdrop-blur-sm p-12 md:p-16 border border-border/50">
            <div className="flex flex-col gap-6 text-center md:text-left">
              <h2 className="text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                {achievementsTitle}
              </h2>
              <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
                {achievementsDescription}
              </p>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {achievements.map((item, idx) => (
                <div className="flex flex-col gap-4" key={item.label + idx}>
                  <span className="text-4xl font-semibold md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                    {item.value}
                  </span>
                  <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-[0.1] md:block"></div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export { About };
