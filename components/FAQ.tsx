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
      "Our AI analyzes your website across multiple dimensions including SEO, accessibility, performance, and user experience. It crawls your site, examines the code structure, content quality, and technical implementation to provide comprehensive insights and actionable recommendations.",
  },
  {
    question: "Is the website audit really free?",
    answer:
      "Yes, our basic website audit is completely free with no hidden costs. You can analyze any website and receive detailed reports without creating an account or providing payment information. Premium features with advanced analytics will soon be available for users who need deeper insights.",
  },
  {
    question: "How long does it take to complete an audit?",
    answer:
      "Most website audits are completed within 10-15 seconds. The exact time depends on your website's size and complexity. Simple sites with fewer pages typically finish faster, while larger sites with extensive content may take a bit longer to analyze thoroughly.",
  },
  {
    question: "What aspects of my website are analyzed?",
    answer:
      "Our audit covers SEO optimization, page speed performance, mobile responsiveness, accessibility compliance, security issues, content quality, technical SEO elements, user experience factors, and conversion rate optimization opportunities.",
  },
  {
    question: "Can I audit any website, including competitors?",
    answer:
      "Yes, you can audit any publicly accessible website, including competitor sites. This is useful for competitive analysis and benchmarking your performance against industry standards. However, please respect privacy and use this information ethically.",
  },
  {
    question: "How accurate are the AI recommendations?",
    answer:
      "Our AI recommendations are based on current web standards, best practices, and proven optimization techniques. While highly accurate, we recommend reviewing suggestions in context of your specific business goals and having technical changes implemented by qualified developers.",
  },
  {
    question: "Do I need technical knowledge to understand the results?",
    answer:
      "No, our reports are designed to be accessible to both technical and non-technical users. We provide clear explanations, prioritized recommendations, and actionable next steps. Technical details are available for developers who need implementation guidance.",
  },
  {
    question: "How often should I audit my website?",
    answer:
      "We recommend auditing your website monthly or after major updates. Regular audits help identify new issues, track improvements, and ensure your site maintains optimal performance as search engine algorithms and web standards evolve.",
  },
];

export function FAQ() {
  return (
    <section className="py-20" aria-labelledby="faq-heading">
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
