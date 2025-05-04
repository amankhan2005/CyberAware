import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen px-4 py-12" style={{ backgroundColor: '#0D1323', color: '#FFFFFF' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

        <p className="mb-4">
          This Cookie Policy explains how Cyber Aware ("we", "our", or "us") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control their use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. What Are Cookies?</h2>
        <p className="mb-4">
          Cookies are small data files that are placed on your device when you visit a website. Cookies are widely used to make websites work more efficiently, as well as to provide reporting information and personalization.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
        <p className="mb-4">
          We use cookies for several purposes:
        </p>
        <ul className="list-disc ml-6 space-y-2 mb-4">
          <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly.</li>
          <li><strong>Performance and Analytics Cookies:</strong> These help us understand how visitors interact with our site.</li>
          <li><strong>Functionality Cookies:</strong> These allow the website to remember your preferences and settings.</li>
          <li><strong>Advertising Cookies:</strong> These cookies are used to deliver relevant ads and track campaign performance.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third-Party Cookies</h2>
        <p className="mb-4">
          We may allow third-party service providers to use cookies on our website for analytics, advertising, and other purposes. These cookies are governed by the third parties' own privacy policies.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. How to Control Cookies</h2>
        <p className="mb-4">
          You have the right to decide whether to accept or reject cookies. You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. If you disable or reject cookies, some parts of our website may become inaccessible or not function properly.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our use of cookies or this Cookie Policy, contact us at: <br />
          <a href="mailto:privacy@cyberaware.com" className="underline text-blue-400">privacy@cyberaware.com</a>
        </p>

        <p className="text-sm text-gray-400 mt-8">Last updated: May 4, 2025</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
