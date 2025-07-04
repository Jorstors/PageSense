"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "How does the AI website audit work?",
    answer:
      "Our AI analyzes your website using advanced algorithms that examine SEO, accessibility, performance, and user experience. It crawls your site, evaluates code structure, content quality, and technical implementation, then identifies specific conversion blockers and provides actionable recommendations based on proven optimization techniques.",
  },
  {
    question: "Is the website audit really free?",
    answer:
      "Yes, our basic website audit is completely free with no hidden costs or credit card required. You can analyze any website and receive detailed reports without creating an account. We believe in providing value upfront - our free audits include conversion blockers, SEO analysis, and actionable recommendations that many tools charge for.",
  },
  {
    question: "How long does it take to complete an audit?",
    answer:
      "Most website audits are completed and delivered within 10-15 seconds. Our AI works incredibly fast to analyze your site's SEO, performance, accessibility, and user experience. You'll receive both your PDF download and email report almost instantly.",
  },
  {
    question: "What formats do I receive my audit results in?",
    answer:
      "You'll receive your audit results in two convenient formats: a detailed PDF report that's automatically downloaded to your device, and an HTML email version sent directly to your inbox. Both contain the same comprehensive analysis, conversion blockers, and actionable recommendations.",
  },
  {
    question: "What specific issues does the audit identify?",
    answer:
      "Our audit identifies conversion blockers like weak headlines, poor call-to-actions, layout issues, slow loading times, mobile responsiveness problems, SEO gaps, accessibility violations, security concerns, and user experience friction points that prevent visitors from converting.",
  },
  {
    question: "Can I audit any website, including competitors?",
    answer:
      "Yes, you can audit any publicly accessible website, including competitor sites. This is perfect for competitive analysis and benchmarking your performance against industry leaders. Use these insights ethically to improve your own site's conversion rates.",
  },
  {
    question: "Are there any limits on how many audits I can run?",
    answer:
      "Yes, to ensure fair usage and optimal performance for all users, we have a rate limit of 3 free audits per email address every 24 hours. This helps us manage server resources while providing quality service to everyone. Need more? Contact us about premium plans.",
  },
  {
    question: "Do you store my website data or audit results?",
    answer:
      "We respect your privacy. We only temporarily process your website data to generate the audit report, then delete it from our servers. Your audit results are sent directly to you via email and PDF download - we don't store or share your reports with anyone.",
  },
  {
    question: "How accurate and actionable are the AI recommendations?",
    answer:
      "Our AI recommendations are based on current web standards, conversion rate optimization best practices, and proven techniques used by high-converting websites. Each suggestion includes specific implementation guidance, though we recommend having technical changes reviewed by qualified developers.",
  },
  {
    question: "What makes Pagesense different from other audit tools?",
    answer:
      "Pagesense focuses specifically on conversion rate optimization, not just technical SEO. Our AI identifies actual conversion blockers that prevent sales and leads, provides specific improvement suggestions, and delivers results in seconds - not hours. Plus, it's completely free with no account required.",
  },
];

export function FAQ() {
  return (
    <section className="py-10" aria-labelledby="faq-heading">
      <div className="container px-2 md:px-14">
        <div className="text-center mb-16">
        <h1 id="faq-heading" className="text-foreground mb-4 text-center text-3xl font-bold tracking-tighter sm:text-6xl">
          <span className="bg-gradient-to-b from-foreground to-foreground/50 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our AI-powered website audit tool
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single"  className="w-full space-y-4" defaultValue="item-0">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="group border border-border rounded-xl bg-card/70 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left font-semibold text-lg text-card-foreground hover:no-underline hover:text-primary transition-colors duration-200 px-4 sm:px-6 py-4 w-full">
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full group-hover:scale-125 transition-transform duration-200"></span>
                    <span className="text-left break-words">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base px-4 sm:px-6 pb-4">
                  <div className="pl-3 sm:pl-5 border-l-2 border-accent ml-0 break-words">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        </div>
    </section>
  );
}
