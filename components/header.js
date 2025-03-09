import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect } from "react"; // Removed useState since we’ll use context
import { useAppContext } from "../lib/AppContext"; // Import the context hook

function Header({ simple, hideAuth }) {
  const { isAuthenticated, logout, cart } = useAppContext(); // Access cart and auth from context

  // Logout function to clear token and update state
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout(); // Use logout from context to clear auth and cart
    window.location.href = "/auth/login"; // Or use Next.js router
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <span className="ms-2 mb-0 h4 text-primary fw-bold">
                Swiss Time Square
              </span>
            </a>
          </Link>
          <div className="collapse navbar-collapse">
            <form className="d-flex">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  size="32"
                />
                <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex">
            {!hideAuth && (
              <>
                {!isAuthenticated ? (
                  <>
                    <Link href="/auth/login">
                      <a className="btn btn-outline-primary d-none d-md-block">
                        Login
                      </a>
                    </Link>
                    <Link href="/auth/sign-up">
                      <a className="btn btn-primary d-none d-md-block ms-2">
                        Sign up
                      </a>
                    </Link>
                  </>
                ) : (
                  <div className="dropdown d-none d-md-block">
                    <button
                      className="btn btn-outline-primary dropdown-toggle"
                      type="button"
                      id="profileDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon={["fas", "user"]} /> Profile
                    </button>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="profileDropdown"
                    >
                      <li>
                        <Link href="/account/profile">
                          <a className="dropdown-item">
                            <FontAwesomeIcon icon={["fas", "user"]} className="me-2" />
                            Profile
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/account/order-history">
                          <a className="dropdown-item">
                            <FontAwesomeIcon icon={["fas", "list"]} className="me-2" />
                            Order History
                          </a>
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} className="me-2" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
            <Link href="/shopping-cart">
              <a className="btn btn-light border position-relative ms-2 fw-normal">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                 Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-auto">
                  {cart.length} {/* Display dynamic cart item count */}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </nav>
      {!simple && (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container">
            <button
              className="navbar-toggler ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/explore">
                    <a className="nav-link">Explore</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
