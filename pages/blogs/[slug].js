import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Layout from "../../components/layout"; // Adjust if not needed

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      axiosInstance
        .get(`/blogs/${slug}`)
        .then((response) => {
          if (response.data.success) {
            setBlog(response.data.data);
            setError(null);
          } else {
            setError("Blog post not found.");
          }
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to load blog post.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading blog post...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="container py-4 text-center">
        <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} className="text-danger me-2" />
        <span>{error || "Blog post not found."}</span>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href="/blogs">
              <a>Blogs</a>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {blog.title}
          </li>
        </ol>
      </nav>

      {/* Blog Header */}
      <div className="mb-4">
        <h1 className="fw-bold mb-3">{blog.title}</h1>
        <p className="text-muted mb-2">
          <FontAwesomeIcon icon={["fas", "calendar-alt"]} className="me-2" />
          {new Date(blog.published_at).toLocaleDateString()}
          {" | "}
          <Link href={`/blogs/category/${blog.category.slug}`}>
            <a className="text-primary">{blog.category.name}</a>
          </Link>
        </p>
        {blog.tags.length > 0 && (
          <div>
            {blog.tags.map((tag) => (
              <span key={tag.id} className="badge bg-primary me-2">
                {tag.name.en}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Blog Image */}
      {blog.media[0].original_url && (
        <div className="mb-4">
          <img
            src={`${blog.media[0].original_url}`}
            alt={blog.title}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="mb-4">
        <p className="text-dark">{blog.content}</p>
      </div>

      {/* Author */}
      <div className="mb-4">
        <p className="mb-0 fw-semibold">{blog.author.name}</p>
      </div>

      {/* Back to Blogs */}
      <div className="text-center">
        <Link href="/blogs">
          <a className="btn btn-outline-primary">Back to Blogs</a>
        </Link>
      </div>
    </div>
  );
}

// Optional: Use Layout if applicable
BlogPost.getLayout = (page) => <Layout>{page}</Layout>;
