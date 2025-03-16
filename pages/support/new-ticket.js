import { useState, useEffect } from "react";
import axiosInstance from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function NewTicket() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default to false

  // Check authentication status and fetch CSRF token on mount (client-side only)
  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Set true if token exists

      // Fetch CSRF token
      axiosInstance.get("/sanctum/csrf-cookie")
        .catch((err) => console.error("Failed to fetch CSRF token:", err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axiosInstance.post("/tickets", {
        subject,
        message,
      });
      if (response.data.success) {
        setSuccess(response.data.message || "Ticket submitted successfully!");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("You must be logged in to submit a ticket.");
        setIsAuthenticated(false);
      } else {
        setError(
          err.response?.data?.message || "Failed to submit ticket. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-4 text-center">
        <p>Please log in to submit a ticket.</p>
        <Link href="/auth/login">
          <a className="btn btn-primary">Log In</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/support/tickets">
              <a>Support Tickets</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            New Ticket
          </li>
        </ol>
      </nav>

      <h1 className="fw-bold mb-4">Submit a Support Ticket</h1>

      {success && (
        <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
          <FontAwesomeIcon icon={["fas", "check-circle"]} className="me-2" />
          <span>{success}</span>
        </div>
      )}
      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
          <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} className="me-2" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            className="form-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}
