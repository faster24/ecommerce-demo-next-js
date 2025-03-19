import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppContext } from "../lib/AppContext";
import api from "../api/api.js"; 

function Header({ simple, hideAuth }) {
  const { isAuthenticated, logout, cart } = useAppContext();
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    window.location.href = "/auth/login";
  };

  // Fetch products from API when searchQuery changes
  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]); // Clear results if query is empty
        return;
      }

      setIsLoading(true);
      try {
        const response = await api.get("/products/filterProduct", {
          params: { name: searchQuery }, // Pass search query as a parameter
        });
        if (response.data.status === "success") {
          setSearchResults(response.data.data); // Set products from API response
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchProducts, 300); // Debounce to limit API calls
    return () => clearTimeout(debounce); // Cleanup on unmount or query change
  }, [searchQuery]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
            <form className="d-flex position-relative">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  size="32"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </button>
              </div>
              {/* Search Results Dropdown */}
              {searchQuery && (
                <div
                  className="position-absolute bg-white border shadow-sm w-100 mt-5"
                  style={{ zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}
                >
                  {isLoading ? (
                    <div className="p-2 text-center">Loading...</div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <Link href={`/product/${product.id}`} key={product.id}>
                        <a className="d-block p-2 text-dark text-decoration-none hover:bg-light">
                          <div className="d-flex align-items-center">
                            {product.media.length > 0 && (
                              <img
                                src={product.media[0].url}
                                alt={product.name}
                                className="me-2"
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              />
                            )}
                            <span>{product.name}</span>
                          </div>
                        </a>
                      </Link>
                    ))
                  ) : (
                    <div className="p-2 text-center">No products found</div>
                  )}
                </div>
              )}
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
                  {cart.length}
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
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;
