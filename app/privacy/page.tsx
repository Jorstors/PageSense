"use client";

import { PageHeader } from "@/components/ui/page-header-alt";

export default function PrivacyPolicy() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 md:px-6">
      <PageHeader
        heading="Privacy Policy"
        subheading="Last updated: July 10, 2025"
      />

      <div className="mt-8 space-y-8 text-foreground/90">
        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">1. Information We Collect</h2>
          <p className="leading-relaxed mb-3">
            We collect information you provide directly to us, such as your name, email address, and any other information you choose to provide when you register for an account, use our services, or communicate with us.
          </p>
          <p className="leading-relaxed">
            We automatically collect certain information about your device and how you interact with our services, including IP address, browser type, pages viewed, and time spent on pages.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">2. How We Use Your Information</h2>
          <p className="leading-relaxed mb-2">
            We use the information we collect to:
          </p>
          <ul className="space-y-1 list-disc pl-6">
            <li className="leading-relaxed">Provide, maintain, and improve our services</li>
            <li className="leading-relaxed">Process and complete transactions</li>
            <li className="leading-relaxed">Send you technical notices, updates, and administrative messages</li>
            <li className="leading-relaxed">Respond to your comments, questions, and requests</li>
            <li className="leading-relaxed">Monitor and analyze trends, usage, and activities</li>
            <li className="leading-relaxed">Detect, prevent, and address fraud and other illegal activities</li>
          </ul>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">3. Sharing of Information</h2>
          <p className="leading-relaxed mb-2">
            We may share your information with:
          </p>
          <ul className="space-y-1 list-disc pl-6">
            <li className="leading-relaxed">Service providers who perform services on our behalf</li>
            <li className="leading-relaxed">Third parties if required by law or legal process</li>
            <li className="leading-relaxed">In connection with a merger, sale of company assets, financing, or acquisition</li>
          </ul>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">4. Data Security</h2>
          <p className="leading-relaxed">
            We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">5. Your Choices</h2>
          <p className="leading-relaxed">
            You may update, correct, or delete your account information at any time by logging into your account settings. You may also contact us to request access to, correction of, or deletion of personal information we have about you.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">6. Cookies</h2>
          <p className="leading-relaxed">
            We use cookies and similar technologies to collect information about your browsing activities and to distinguish you from other users of our services. You can set your browser to refuse all or some cookies or to alert you when cookies are being sent.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">7. Children&apos;s Privacy</h2>
          <p className="leading-relaxed">
            Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">8. Changes to This Policy</h2>
          <p className="leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">9. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at privacy@pagesense.co.
          </p>
        </section>
      </div>
    </div>
  );
}
