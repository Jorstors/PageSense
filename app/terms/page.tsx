"use client";

import { PageHeader } from "@/components/ui/page-header-alt";

export default function TermsOfService() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 md:px-6">
      <PageHeader
        heading="Terms of Service"
        subheading="Last updated: July 10, 2025"
      />

      <div className="mt-8 space-y-8 text-foreground/90">
        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">1. Introduction</h2>
          <p className="leading-relaxed">
            Welcome to PageSense (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). By accessing or using our website and services, you agree to be bound by these Terms of Service.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">2. Use of Services</h2>
          <p className="leading-relaxed">
            Our services are provided for your personal and non-commercial use. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">3. User Content</h2>
          <p className="leading-relaxed">
            You retain ownership of any content you submit through our services. By submitting content, you grant us a worldwide, non-exclusive license to use, reproduce, and display your content in connection with our services.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">4. Prohibited Activities</h2>
          <p className="leading-relaxed mb-2">
            You agree not to:
          </p>
          <ul className="space-y-1 list-disc pl-6">
            <li className="leading-relaxed">Violate any laws or regulations</li>
            <li className="leading-relaxed">Infringe upon the rights of others</li>
            <li className="leading-relaxed">Use our services for unauthorized commercial purposes</li>
            <li className="leading-relaxed">Attempt to gain unauthorized access to our systems</li>
            <li className="leading-relaxed">Interfere with the proper functioning of our services</li>
          </ul>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">5. Termination</h2>
          <p className="leading-relaxed">
            We reserve the right to suspend or terminate your access to our services at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">6. Disclaimer</h2>
          <p className="leading-relaxed">
            Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">7. Limitation of Liability</h2>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">8. Changes to Terms</h2>
          <p className="leading-relaxed">
            We may modify these Terms at any time. Your continued use of our services after any changes indicates your acceptance of the modified Terms.
          </p>
        </section>

        <section className="border-l-4 border-primary/20 pl-4 py-1">
          <h2 className="text-xl font-bold mb-3 text-primary">9. Contact Us</h2>
          <p className="leading-relaxed">
            If you have any questions about these Terms, please contact us at info@pagesense.co.
          </p>
        </section>
      </div>
    </div>
  );
}
