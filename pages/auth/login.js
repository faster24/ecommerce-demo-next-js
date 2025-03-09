import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout";
import { useState } from "react"; // Import useState for form state management
import axiosInstance from "../../api/api.js"; // Import your Axios instance

function Login() {
  const router = useRouter();

  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // Send a POST request to the Laravel login API using Axios
      const response = await axiosInstance.post("/login", formData);

      // Login successful
      setMessage("Login successful! Redirecting...");
      setIsError(false);

      // Store the token in localStorage (or cookies)
      localStorage.setItem("token", response.data.token);

      // Redirect to the profile page after a delay
      setTimeout(() => {
        router.push("/account/profile").then(() => {
          window.location.reload(); // Reload after navigation
        });
      }, 2000);
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Backend returned an error response
        setMessage(error.response.data.message || "Login failed. Please try again.");
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
        <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body px-4">
              <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>

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

              <form className="row g-2" onSubmit={handleSubmit}>
                <div className="col-md-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@domain.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-12">
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
                <div className="col-md-12">
                  <Link href="/auth/forgot-password">
                    <a className="text-decoration-none">Forgot password?</a>
                  </Link>
                </div>
                <div className="col-md-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="row g-2">
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                    <div className="col-auto align-self-center text-muted">
                      or continue with
                    </div>
                    <div className="col">
                      <hr className="text-muted" />
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="hstack gap-2 justify-content-center">
                    <button className="btn-facebook rounded-circle">
                      <FontAwesomeIcon icon={["fab", "facebook-f"]} />
                    </button>
                    <button className="btn-google rounded-circle">
                      <FontAwesomeIcon icon={["fab", "google"]} />
                    </button>
                    <button className="btn-apple rounded-circle">
                      <FontAwesomeIcon icon={["fab", "apple"]} />
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <hr className="text-muted my-0" />
            <div className="text-center p-3">
              Don&lsquo;t have an account?{" "}
              <Link href="/auth/sign-up">
                <a className="text-decoration-none fw-medium">Register</a>
              </Link>
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

Login.getLayout = (page) => {
  return (
    <Layout simpleHeader hideAuth>
      {page}
    </Layout>
  );
};

export default Login;
