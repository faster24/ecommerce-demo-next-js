import { useEffect, useState } from "react";
import axiosInstance from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAppContext } from "../../lib/AppContext";

export default function Tickets() {
  const { isAuthenticated, user } = useAppContext();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/tickets");
      if (response.data.success) {
        setTickets(response.data.data);
      } else {
        setError("Failed to load your tickets.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("You must be logged in to view your tickets.");
      } else {
        setError(err.response?.data?.message || "Error fetching your tickets.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTickets();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="container py-4 text-center">
        <p>Please log in to view your tickets.</p>
        <Link href="/auth/login">
          <a className="btn btn-primary">Log In</a>
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading your tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4 text-center">
        <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} className="text-danger me-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Your Support Tickets
          </li>
        </ol>
      </nav>

      <h1 className="fw-bold mb-4">Your Support Tickets</h1>

      {tickets.length === 0 ? (
        <div className="text-center">
          <FontAwesomeIcon icon={["fas", "inbox"]} size="3x" className="text-muted mb-3" />
          <p className="text-muted">You haven’t submitted any tickets yet.</p>
          <Link href="/support/new-ticket">
            <a className="btn btn-primary">Submit a New Ticket</a>
          </Link>
        </div>
      ) : (
        <ul className="list-group mb-4">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="list-group-item d-flex justify-content-between align-items-start"
            >
              <div>
                <strong>{ticket.subject}</strong>
                <p className="mb-1">{ticket.message}</p>
                <small className="text-muted">
                  <FontAwesomeIcon icon={["fas", "clock"]} className="me-1" />
                  {new Date(ticket.created_at).toLocaleString()}
                </small>
              </div>
              <span
                className={`badge ${
                  ticket.status === "pending" ? "bg-warning text-dark" : "bg-success"
                }`}
              >
                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
