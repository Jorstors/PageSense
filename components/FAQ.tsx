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
      "Our AI analyzes your website using advanced algorithms that examine SEO, accessibility, performance, and user experience. It evaluates your site's structure, content quality, and technical implementation, then identifies specific conversion blockers and provides actionable recommendations based on proven optimization techniques.",
  },
  {
    question: "Do I need to create an account to use PageSense?",
    answer:
      "No, you don't need an account to use our basic audit features. Anyone can analyze a website without signing up. However, creating a free account gives you access to our dashboard where you can save and track your audit history over time.",
  },
  {
    question: "How long does it take to complete an audit?",
    answer:
      "Most website audits are completed within 15-30 seconds. Our AI works efficiently to analyze your site's layout, content, user experience, and conversion elements. Once complete, you can immediately access your audit report.",
  },
  {
    question: "How can I access my audit results?",
    answer:
      "For guest users, audit results are displayed immediately after completion. If you have an account, all your audit results are also saved in your personal dashboard. Simply log in to your account and navigate to the 'Saved Audits' tab to view your previous audits in detail.",
  },
  {
    question: "What specific issues does the audit identify?",
    answer:
      "Our audit identifies conversion blockers like weak headlines, poor call-to-actions, layout issues, slow loading times, mobile responsiveness problems, SEO gaps, accessibility violations, and user experience friction points that prevent visitors from converting.",
  },
  {
    question: "Can I audit any website, including competitors?",
    answer:
      "Yes, you can audit any publicly accessible website, including competitor sites. This is perfect for competitive analysis and benchmarking your performance against industry leaders. Use these insights ethically to improve your own site's conversion rates.",
  },
  {
    question: "Are there any limits on how many audits I can run?",
    answer:
      "Yes, to ensure fair usage and optimal performance for all users, we have a rate limit of 3 audits per 24 hours. This applies to both guest users and registered accounts. This helps us manage server resources while providing quality service to everyone. Premium plans with higher limits may be available in the future.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. For registered users, we use Firebase Authentication and secure database practices to ensure your account information and audit data remain private. We only store the information necessary to provide our service and continuously improve our security measures. For guest users, we don't store any personal information beyond what's needed for rate limiting.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer:
      "Our AI recommendations are based on current web standards, conversion rate optimization best practices, and proven techniques used by high-converting websites. Each suggestion includes specific implementation guidance, though we recommend having technical changes reviewed by qualified developers.",
  },
  {
    question: "What makes PageSense different from other audit tools?",
    answer:
      "PageSense focuses specifically on conversion rate optimization, not just technical SEO. Our AI identifies actual conversion blockers that prevent sales and leads, and we provide a complete dashboard experience for managing all your audits. Our user-friendly interface makes it easy to understand recommendations and track improvements over time.",
  },
  {
    question: "Can I track improvements to my website over time?",
    answer:
      "Yes, but this feature requires a free account. When logged in, your dashboard keeps a history of all your audits, allowing you to run new audits after making changes to see how your score improves. This makes it easy to validate the effectiveness of the changes you've implemented based on our recommendations.",
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
            Everything you need to know about our AI-powered website audit platform
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
