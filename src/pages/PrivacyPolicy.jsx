import React from "react";
import { Link } from "react-router-dom";
const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
    <Link to="/auth" className="text-blue-500 hover:underline">
          &larr; Back
        </Link>
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-900">Privacy Policy</h1>
      <p className="mb-4">
        At Talentforge, we are committed to protecting the privacy of
        our users. This Privacy Policy outlines how we collect, use, disclose,
        and protect your personal information when you use our website or
        services.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Information We Collect</h2>
      <p className="mb-4">
        When you visit our website or use our services, we may collect certain
        information about you, including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Personal information such as your name, email address, and phone number.</li>
        <li>Usage data, including your IP address, browser type, and operating system.</li>
        <li>Information about your interactions with our website or services, such as pages visited and actions taken.</li>
        <li>Any other information you provide to us voluntarily.</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">How We Use Your Information</h2>
      <p className="mb-4">
        We may use the information we collect for various purposes, including:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Providing and improving our services.</li>
        <li>Communicating with you, including responding to inquiries and providing customer support.</li>
        <li>Personalizing your experience and delivering targeted content and advertisements.</li>
        <li>Conducting research and analysis to better understand our users and improve our products and services.</li>
        <li>Complying with legal and regulatory requirements.</li>
      </ul>
      <p className="mb-4">
        We will not sell, rent, or lease your personal information to third parties unless we have your permission or are required by law to do so.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Data Security</h2>
      <p className="mb-4">
        We take appropriate measures to safeguard the information we collect and prevent unauthorized access, disclosure, alteration, or destruction of your personal information.
      </p>
      <p className="mb-4">
        However, please be aware that no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the new Privacy Policy on this page.
      </p>
      <p className="mb-4">
        By continuing to use our website or services after any changes to this Privacy Policy, you acknowledge and agree to the updated terms.
      </p>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <h1>bt21cse019@nituk.ac.in .</h1>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
