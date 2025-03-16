import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-responsive-carousel";
import ProductSimpleCard from "../components/product/product-simple-card";
import { useEffect, useState } from "react";
import axiosInstance from "../api/api";
import Link from "next/link";
import { useAppContext } from "../lib/AppContext"; // Import AppContext

export default function Home() {
  const { addToCart } = useAppContext(); // Get addToCart from context
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch products
    axiosInstance
      .get("/products")
      .then((response) => {
        console.log("Products:", response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    // Fetch blogs
    axiosInstance
      .get("/blogs?page=1")
      .then((response) => {
        console.log("Blogs:", response.data);
        if (response.data.success) {
          setBlogs(response.data.data.slice(0, 3));
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setBlogs([
          {
            id: 1,
            title: "Top 5 Trends in E-Commerce 2025",
            content: "Discover the latest trends shaping online shopping this year.",
            slug: "top-5-trends-2025",
          },
          {
            id: 2,
            title: "How to Choose the Perfect Gift",
            content: "Tips and tricks for finding the ideal present for any occasion.",
            slug: "choose-perfect-gift",
          },
          {
            id: 3,
            title: "Sustainable Shopping Guide",
            content: "Learn how to shop eco-friendly with our expert advice.",
            slug: "sustainable-shopping-guide",
          },
        ]);
      });
  }, []);

  return (
    <div>
      <div className="container py-3">
        {/* Carousel Section */}
        <div className="row mb-4">
          <div className="col-12">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              transitionTime={500}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                  return (
                    <li className="d-inline-block m-2 text-light">
                      <FontAwesomeIcon icon={["fas", "circle"]} size="xs" />
                    </li>
                  );
                }
                return (
                  <li
                    className="d-inline-block m-2 text-light text-opacity-50"
                    onClick={onClickHandler}
                    key={index}
                    role="button"
                    tabIndex={0}
                  >
                    <FontAwesomeIcon icon={["fas", "circle"]} size="xs" />
                  </li>
                );
              }}
            >
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
            </Carousel>
          </div>
        </div>

        {/* Features Section */}
        <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "money-bill-alt"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Reasonable Price</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "headset"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Customer Support 24/7</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "truck"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Fast Delivery</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* New Products Section */}
        <h4 className="mb-3 fw-semibold">New Products</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-3">
          {products.slice(0, 8).map((product) => ( // Limit to 8 products
            <div className="col" key={product.id}>
              <ProductSimpleCard
                id={product.id}
                title={product.name}
                price={product.price}
                image={product.image_urls[0]}
                product={product}
                addToCart={addToCart}
              />
            </div>
          ))}
        </div>
        {/* Explore Button */}
        <div className="row mb-5">
          <div className="col-12 text-center">
            <Link href="/explore">
              <a className="btn btn-primary">Explore More Products</a>
            </Link>
          </div>
        </div>

        {/* Blogs Section */}
        <h4 className="mb-3 fw-semibold">Latest Blogs</h4>
        <div className="row mb-5">
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {blogs.map((blog) => (
              <div className="col" key={blog.id}>
                <div className="card h-100 border-0 shadow-sm">
                  {blog.image && (
                    <img
                      src={`http://localhost:8000/storage/${blog.image}`}
                      alt={blog.title}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
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
                      {blog.content.length > 80
                        ? `${blog.content.substring(0, 80)}...`
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
          <div className="row">
            <div className="col-12 text-center mt-3">
              <Link href="/blogs">
                <a className="btn btn-primary">View All Blogs</a>
              </Link>
            </div>
          </div>
        </div>

        {/* Support Tickets Section */}
        <h4 className="mb-3 fw-semibold">Support</h4>
        <div className="row mb-5">
          <div className="col-12 col-md-6 mx-auto">
            <div className="card border-0 shadow-sm text-center p-4">
              <FontAwesomeIcon
                icon={["fas", "headset"]}
                size="3x"
                className="text-primary mb-3"
              />
              <h5 className="card-title fw-bold">Need Help?</h5>
              <p className="card-text text-muted">
                Check your support tickets or submit a new one for assistance.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link href="/support/tickets">
                  <a className="btn btn-outline-primary">View Tickets</a>
                </Link>
                <Link href="/support/new-ticket">
                  <a className="btn btn-primary">Submit a Ticket</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
