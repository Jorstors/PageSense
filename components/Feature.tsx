import { Button } from "@/components/ui/button";

interface FeatureProps {
  title: string;
  description?: string;
  buttonPrimary: {
    label: string;
    href: string;
  };
  buttonSecondary: {
    label: string;
    href: string;
  };
}

const Feature = ({
  title = "Ready to improve your conversion rate?",
  description = "Our AI-powered tool analyzes your website instantly, providing actionable insights to boost conversions, reduce bounce rates, and enhance user engagement.",
  buttonPrimary = {
    label: "Try it now",
    href: "/tool",
  },
  buttonSecondary = {
    label: "Learn More",
    href: "/about",
  },
}: FeatureProps) => {
  return (
    <section className="pb-50 pt-10 overflow-hidden">
      <div className="container px-2 md:px-14">
        <div className="grid items-center justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-start text-start">
            <h2 className="my-6 mt-0 text-4xl font-semibold lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50 break-words min-h-15">
              {title}
            </h2>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
              {description}
            </p>
            <div className="flex w-full flex-col justify-start gap-2 sm:flex-row">
              <Button variant="default" asChild className="alt-button">
                <a href={buttonPrimary.href}>{buttonPrimary.label}</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={buttonSecondary.href}>{buttonSecondary.label}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature };
