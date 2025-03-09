import Link from "next/link";
import Layout from "../../components/layout";
import { useState } from "react"; // Import useState for form state management
import axiosInstance from "../../api/api.js"; // Import your Axios instance

function SignUp() {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  // State to handle API response messages
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Send a POST request to the Laravel register API using Axios
      const response = await axiosInstance.post("/register", formData);

      // Registration successful
      setMessage("Registration successful! Redirecting to login...");
      setIsError(false);

      // Optionally, redirect to the login page after a delay
      setTimeout(() => {
        window.location.href = "/auth/login";
      }, 2000);
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Backend returned an error response
        setMessage(error.response.data.message || "Registration failed. Please try again.");
      } else {
        // Network or other errors
        setMessage("An error occurred. Please try again.");
      }
      setIsError(true);
      console.error("Error:", error);
    }
  };

  return (
    <div className="container py-3">
      <div className="row my-4">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>

              {/* Display success/error messages */}
              {message && (
                <div
                  className={`alert ${
                    isError ? "alert-danger" : "alert-success"
                  }`}
                >
                  {message}
                </div>
              )}

              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12 mt-4">
                  <button type="submit" className="btn btn-primary w-100">
                    Register
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="text-muted bg-light rounded p-3 border small">
                    By clicking the &lsquo;Sign Up&lsquo; button, you confirm
                    that you accept our{" "}
                    <a href="#">Terms of use and Privacy Policy</a>.
                  </div>
                </div>
              </form>

              <hr className="text-muted" />
              <div className="text-center">
                Already have an account?{" "}
                <Link href="/auth/login">
                  <a className="text-decoration-none fw-medium">Login</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

SignUp.getLayout = (page) => {
  return <Layout simpleHeader hideAuth>{page}</Layout>;
};

export default SignUp;
