import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: '#0D1323', color: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          This Privacy Policy explains how Cyber Aware ("we", "our", or "us") collects, uses, and protects your personal information when you visit or use our website and services. By accessing or using Cyber Aware, you agree to this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li><strong>Personal Information:</strong> such as your name, email address, and contact details when you sign up, contact us, or subscribe.</li>
          <li><strong>Usage Data:</strong> including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.</li>
          <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to monitor and analyze activity on our service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Provide, maintain, and improve our services.</li>
          <li>Communicate with you, including for customer support and service updates.</li>
          <li>Monitor and analyze usage trends and preferences.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li>Trusted third-party service providers who assist in our operations.</li>
          <li>Law enforcement or regulators if required by law.</li>
          <li>In connection with a merger, sale, or acquisition.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cookies</h2>
        <p className="mb-4">
          We use cookies to enhance user experience, analyze site traffic, and personalize content. You can control or disable cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Data Security</h2>
        <p className="mb-4">
          We take appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. You may also object to or restrict certain processing activities.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children’s Privacy</h2>
        <p className="mb-4">
          Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, you can contact us at: <br />
          <a href="mailto:privacy@cyberaware.com" className="underline text-blue-400">privacy@cyberaware.com</a>
        </p>

        <p className="text-sm text-gray-400 mt-8">Last updated: May 4, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
