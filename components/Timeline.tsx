import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = [
  {
    date: "Step 1",
    title: "Enter a URL to Audit",
    content:
      "Paste the full URL of any landing page you want insights on. This could be your homepage, a product page, or even a competitor’s site. Example: <code>https://yourdomain.com/offer</code>",
  },
  {
    date: "Step 2",
    title: "Enter Your Email",
    content:
      "Provide your email to receive the full PDF audit in your inbox. We respect your privacy—no spam, ever.",
  },
  {
    date: "Step 3",
    title: "Click 'Email' to Run the Audit",
    content:
      "Hit the <strong>Email</strong> button. In seconds, your personalized audit will be sent to your inbox <em>and</em> available for optional download. No waiting, no strings attached.",
  },
];

const Timeline = () => {
  return (
    <section className="bg-transparent py-10">
      <div className="container px-2 md:px-14 w-full">
        <h1 className="text-foreground mb-10 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            How to use it?
          </span>
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-2 top-4"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="bg-foreground absolute left-0 top-3.5 flex size-4 items-center justify-center rounded-full" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md -left-34 text-muted-foreground top-3 rounded-xl tracking-tight xl:absolute">
                {entry.date}
              </h5>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-5">
                  <div
                    className="prose dark:prose-invert text-foreground"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Timeline };
