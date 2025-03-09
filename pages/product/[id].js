import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductRating from "../../components/product-rating";
import ProductSimpleHorizontal from "../../components/product/product-simple-horizontal";
import axiosInstance from "../../api/api.js";
import { useRouter } from "next/router";
import { useAppContext } from "../../lib/AppContext"; // Import the context hook

function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { addToCart } = useAppContext(); // Access addToCart from context
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product data when id is available
  useEffect(() => {
    if (!router.isReady || !id) return;

    setLoading(true);
    axiosInstance
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log("Product Data:", response.data); // For debugging
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details.");
        setLoading(false);
      });
  }, [id, router.isReady]);

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (product) {
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      };
      addToCart(productToAdd);
      console.log(`${product.name} added to cart!`); // Optional feedback
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product data available.</div>;
  }

  return (
    <div className="vstack">
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">Explore</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-white mb-4">
        <div className="container py-4">
          <div className="row gy-3 gx-4">
            <div className="col-lg-5">
              <div className="row">
                <div className="col-12">
                  <div className="ratio ratio-1x1">
                    <img
                      className="rounded"
                      src={product.image || "/placeholder-image.jpg"}
                      width={300}
                      height={300}
                      alt={product.name}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="d-flex">
                <div className="d-inline h2 mb-0 fw-semibold me-3">
                  {product.name}
                </div>
              </div>

              <div className="vstack">
                <div className="d-flex mb-3 gap-2">
                  <ProductRating />
                  <span className="text-muted small">150 orders</span>
                  <span className="text-success small">
                    <FontAwesomeIcon icon={["fas", "check-circle"]} />
                     In Stock
                  </span>
                </div>
                <h4 className="fw-semibold">{product.price}Ks</h4>
                <p className="fw-light">{product.description}</p>
                <dl className="row mb-0">
                  <dt className="col-sm-3 fw-semibold">Category</dt>
                  <dd className="col-sm-9">
                    {product.categories?.map((cat) => cat.name).join(", ") || "N/A"}
                  </dd>
                  <dt className="col-sm-3 fw-semibold">Brand</dt>
                  <dd className="col-sm-9">{product.brand?.name || "N/A"}</dd>
                  <dt className="col-sm-3 fw-semibold">Delivery</dt>
                  <dd className="col-sm-9">Yangon, Mandalay</dd>
                </dl>
                <hr className="text-muted" />
                <div className="d-flex">
                  <a
                    href="#"
                    className="btn btn-primary px-md-4 col col-md-auto me-2"
                  >
                    Buy now
                  </a>
                  <button
                    className="btn btn-outline-primary col col-md-auto"
                    onClick={handleAddToCart} // Add click handler
                  >
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} />
                     Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div
                className="px-3 d-flex border-bottom overflow-auto"
                style={{ height: 70 }}
              >
                <ul className="nav nav-pills my-auto flex-nowrap">
                  <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="true">
                      Description
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <p>{product.description}</p>
              </div>
              <div className="card-footer py-3">
                <small>
                  <FontAwesomeIcon
                    icon={["fas", "truck"]}
                    className="text-success me-2"
                  />
                  Delivery within 1-2 weeks
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm">
              <div className="px-3 d-flex border-bottom" style={{ height: 70 }}>
                <h5 className="my-auto fw-semibold">Related products</h5>
              </div>
              <div className="card-body">
                <ProductSimpleHorizontal id={1} />
                <ProductSimpleHorizontal id={2} />
                <ProductSimpleHorizontal id={3} />
                <ProductSimpleHorizontal id={4} />
                <ProductSimpleHorizontal id={5} />
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

export default ProductDetail;
