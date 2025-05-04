import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: '#0D1323', color: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <p className="mb-4">
          These Terms and Conditions ("Terms") govern your use of Cyber Aware ("we", "our", or "us"). By accessing or using our website and services, you agree to be bound by these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Our Services</h2>
        <p className="mb-4">
          You must be at least 13 years old to use our services. You agree to use our website only for lawful purposes and in accordance with these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
        <p className="mb-4">
          All content on Cyber Aware, including text, graphics, logos, and software, is the property of Cyber Aware or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Conduct</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>You may not use our services to distribute harmful or unlawful content.</li>
          <li>You may not attempt to gain unauthorized access to our systems or user accounts.</li>
          <li>You must respect the rights and privacy of others when using our platform.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Disclaimer of Warranties</h2>
        <p className="mb-4">
          Our services are provided "as is" without warranties of any kind. We do not guarantee that our website will be error-free, secure, or uninterrupted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, Cyber Aware shall not be liable for any indirect, incidental, or consequential damages resulting from your use of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party sites. We are not responsible for the content, policies, or practices of any third-party websites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate your access to our services at any time, without notice, for conduct that we believe violates these Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of our services after any changes indicates your acceptance of the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by and construed in accordance with the laws of your local jurisdiction, without regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, contact us at: <br />
          <a href="mailto:support@cyberaware.com" className="underline text-blue-400">support@cyberaware.com</a>
        </p>

        <p className="text-sm text-gray-400 mt-8">Last updated: May 4, 2025</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
