import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy | Swiss Time Squre</title>
        <meta name="description" content="Our privacy policy explaining how we handle your data" />
      </Head>

      <div className="container py-5">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <h1 className="fw-bold mb-3">Privacy Policy</h1>
            <p className="lead text-muted">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border-0 shadow-sm p-4 p-md-5">
              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "info-circle"]} className="text-primary me-2" />
                  Introduction
                </h2>
                <p>
                  Welcome to our Privacy Policy. Your privacy is critically important to us. This policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "database"]} className="text-primary me-2" />
                  Information We Collect
                </h2>
                <p>We may collect information about you in a variety of ways:</p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FontAwesomeIcon icon={["fas", "circle"]} className="text-primary me-2" size="xs" />
                    <strong>Personal Data:</strong> Name, email address, phone number, etc. that you voluntarily provide.
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon icon={["fas", "circle"]} className="text-primary me-2" size="xs" />
                    <strong>Derivative Data:</strong> IP address, browser type, access times, etc. collected automatically.
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon icon={["fas", "circle"]} className="text-primary me-2" size="xs" />
                    <strong>Financial Data:</strong> Payment information when you make purchases (processed securely by our payment processor).
                  </li>
                </ul>
              </section>

              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "cookie-bite"]} className="text-primary me-2" />
                  Use of Cookies
                </h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your experience.
                </p>
                <div className="alert alert-light border">
                  <FontAwesomeIcon icon={["fas", "lightbulb"]} className="text-warning me-2" />
                  You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                </div>
              </section>

              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "lock"]} className="text-primary me-2" />
                  Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to maintain the safety of your personal information. However, no electronic transmission over the Internet can be guaranteed to be 100% secure.
                </p>
              </section>

              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "share-square"]} className="text-primary me-2" />
                  Third-Party Disclosures
                </h2>
                <p>
                  We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted third parties who assist us in operating our website, conducting our business, or serving our users.
                </p>
              </section>


              <section className="mb-5">
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "sync-alt"]} className="text-primary me-2" />
                  Policy Changes
                </h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="fw-semibold mb-3">
                  <FontAwesomeIcon icon={["fas", "envelope"]} className="text-primary me-2" />
                  Contact Us
                </h2>
                <p>
                  If you have questions about this Privacy Policy, please contact us at:
                </p>
                <div className="card bg-light border-0 p-3">
                  <p className="mb-1"><strong>Email:</strong> swisstimesquare@swiss.com</p>
                  <p className="mb-1"><strong>Address:</strong> 123 Privacy Lane, Data City, DC 12345</p>
                  <p className="mb-0"><strong>Phone:</strong> (123) 456-7890</p>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <Link href="/">
              <a className="btn btn-outline-primary">
                <FontAwesomeIcon icon={["fas", "arrow-left"]} className="me-2" />
                Back to Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
