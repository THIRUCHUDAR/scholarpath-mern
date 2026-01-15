// src/components/TermsOfService.jsx
import React from 'react';
import './LegalPage.css'; // Import the new CSS

function TermsOfService() {
  return (
    <div className="legal-page-wrapper">
      <div className="legal-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: November 16, 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using ScholarPath (the "Service"), you accept
          and agree to be bound by the terms and provision of this
          agreement. If you do not agree to abide by these terms, please
          do not use this Service.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          To use certain features of the Service, you must register for
          an account. You agree to:
        </p>
        <ul>
          <li>Provide accurate, current, and complete information during the registration process.</li>
          <li>Maintain the security of your password.</li>
          <li>
            Accept all risks of unauthorized access to your account.
          </li>
          <li>
            You must be at least 13 years old to use this Service.
          </li>
        </ul>

        <h2>3. Use of the Service</h2>
        <p>
          You agree to use the Service only for its intended purpose: to
          search for and apply to scholarships. You agree not to misuse
          the Service, including but not limited to:
        </p>
        <ul>
          <li>Submitting false or misleading information.</li>
          <li>Using the Service for any illegal or unauthorized purpose.</li>
          <li>Attempting to interfere with the Service's network or security features.</li>
        </ul>

        <h2>4. Disclaimers</h2>
        <p>
          ScholarPath provides a platform to connect students with
          scholarship providers. We do not guarantee that you will be
          awarded any scholarship.
        </p>
        <p>
          While we work to verify all listings, we are not responsible
          for the accuracy, content, or availability of third-party
          scholarship listings or their application processes. The
          Service is provided "as is" without warranties of any kind.
        </p>
        
        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall ScholarPath be liable for any indirect,
          incidental, or consequential damages arising out of your use
          of the Service.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your access to the Service at any
          time, without prior notice, for conduct that we believe
          violates these Terms of Service or is harmful to other users.
        </p> {/* <-- THIS IS THE CORRECTED LINE */}

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will
          notify you of any changes by posting the new terms on this
          page.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us
          via our <a href="/contact">Contact Page</a>.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;