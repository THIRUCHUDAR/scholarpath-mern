// src/components/PrivacyPolicy.jsx
import React from 'react';
import './LegalPage.css'; // Import the new CSS

function PrivacyPolicy() {
  return (
    <div className="legal-page-wrapper">
      <div className="legal-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: November 16, 2025</p>

        <p>
          Welcome to ScholarPath. We respect your privacy and are committed
          to protecting your personal information. This Privacy Policy
          will inform you as to how we look after your personal data when
          you visit our website and tell you about your privacy rights.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We may collect, use, store, and transfer different kinds of personal data about you:</p>
        <ul>
          <li>
            <strong>Identity Data:</strong> Includes your full name and email address, as provided during signup.
          </li>
          <li>
            <strong>Application Data:</strong> Includes information you provide when you fill out a scholarship application, such as your school, date of birth, and any essays or personal statements.
          </li>
          <li>
            <strong>Technical Data:</strong> Includes internet protocol (IP) address, browser type, and version, time zone setting, and location.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your personal data in the following ways:</p>
        <ul>
          <li>To register you as a new user.</li>
          <li>To match you with potential scholarship opportunities.</li>
          <li>To process and forward your applications to scholarship providers.</li>
          <li>To manage our relationship with you, including notifying you of changes to our terms or privacy policy.</li>
        </ul>

        <h2>3. Data Sharing</h2>
        <p>
          We will only share your personal data in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>With Scholarship Providers:</strong> When you apply for a scholarship, we will share your Application Data directly with that specific scholarship provider.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your data if required by law or in response to valid requests by public authorities.
          </li>
        </ul>
        <p>
          We will **never** sell your personal data to third-party marketers.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We have put in place appropriate security measures to prevent
          your personal data from being accidentally lost, used, or
          accessed in an unauthorized way.
        </p>

        <h2>5. Your Legal Rights</h2>
        <p>
          You have the right to request access to, correction of, or
          deletion of your personal data. You can do this at any time
          by contacting us.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please
          contact us via our <a href="/contact">Contact Page</a>.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;