import { useEffect, useState } from "react";
import axiosInstance from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Layout from "../../components/layout"; // Adjust if not needed

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = (page = 1) => {
    setLoading(true);
    axiosInstance
      .get(`/blogs?page=${page}`)
      .then((response) => {
        if (response.data.success) {
          setBlogs(response.data.data);
          setPagination(response.data.pagination);
          setError(null);
        } else {
          setError("Failed to load blogs.");
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching blogs.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs(); // Fetch page 1 by default
  }, []);

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading blogs...</p>
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
            Blogs
          </li>
        </ol>
      </nav>

      {/* Blogs Header */}
      <h1 className="fw-bold mb-4">Our Blogs</h1>

      {/* Blog List */}
      {blogs.length === 0 ? (
        <div className="text-center">
          <FontAwesomeIcon icon={["fas", "book-open"]} size="3x" className="text-muted mb-3" />
          <p className="text-muted">No blogs available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
          {blogs.map((blog) => (
            <div className="col" key={blog.id}>
              <div className="card h-100 border-0 shadow-sm">
                {blog.media[0].original_url && (
                  <img
                    src={`${blog.media[0].original_url}`}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="text-muted small mb-2">
                    <FontAwesomeIcon icon={["fas", "calendar-alt"]} className="me-1" />
                    {new Date(blog.published_at).toLocaleDateString()}
                    {" | "}
                    <Link href={`/blogs/category/${blog.category.slug}`}>
                      <a className="text-primary">{blog.category.name}</a>
                    </Link>
                  </p>
                  <p className="card-text text-dark">
                    {blog.content.length > 100
                      ? `${blog.content.substring(0, 100)}...`
                      : blog.content}
                  </p>
                  {blog.tags.length > 0 && (
                    <div className="mb-2">
                      {blog.tags.map((tag) => (
                        <span key={tag.id} className="badge bg-primary me-2">
                          {tag.name.en}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-muted small mb-0">By {blog.author.name}</p>
                </div>
                <div className="card-footer bg-transparent border-0">
                  <Link href={`/blogs/${blog.id}`}>
                    <a className="btn btn-outline-primary w-100">Read More</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <nav aria-label="Blog pagination" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pagination.prev_page_url ? "" : "disabled"}`}>
              <button
                className="page-link"
                onClick={() => fetchBlogs(pagination.current_page - 1)}
                disabled={!pagination.prev_page_url}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
              <li
                key={page}
                className={`page-item ${page === pagination.current_page ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => fetchBlogs(page)}>
                  {page}
                </button>
              </li>
            ))}
            <li className={`page-item ${pagination.next_page_url ? "" : "disabled"}`}>
              <button
                className="page-link"
                onClick={() => fetchBlogs(pagination.current_page + 1)}
                disabled={!pagination.next_page_url}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

// Optional: Use Layout if applicable
Blogs.getLayout = (page) => <Layout>{page}</Layout>;
