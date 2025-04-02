import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductGridCard from "../../components/product/product-grid-card";
import axiosInstance from "../../api/api.js";
import { useAppContext } from "../../lib/AppContext";

function ExploreProducts() {
  const router = useRouter();
  const { addToCart } = useAppContext(); // Get addToCart from context

  // State for data
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Sync filters with URL query params on mount
  useEffect(() => {
    const { category, brand, min_price, max_price } = router.query;

    if (category) setSelectedCategory(category);
    if (brand) setSelectedBrand(brand);
    if (min_price) setMinPrice(min_price);
    if (max_price) setMaxPrice(max_price);

    // Fetch brands and categories
    axiosInstance
      .get("/brands")
      .then((response) => setBrands(response.data))
      .catch((error) => console.error("Error fetching brands:", error));
    axiosInstance
      .get("/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Fetch products with initial query params
    fetchProducts();
  }, [router.query]);

  // Function to fetch products based on filters
  const fetchProducts = () => {
    setLoading(true);
    let queryParams = [];

    if (selectedCategory) queryParams.push(`category_id=${selectedCategory}`);
    if (selectedBrand) queryParams.push(`brand_id=${selectedBrand}`);
    if (minPrice !== "") queryParams.push(`min_price=${minPrice}`);
    if (maxPrice !== "") queryParams.push(`max_price=${maxPrice}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    axiosInstance
      .get(`/products/search${queryString}`)
      .then((response) => {
        setProducts(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

    console.log(products);
  // Update URL and fetch products on filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const query = {};
    if (selectedCategory) query.category = selectedCategory;
    if (selectedBrand) query.brand = selectedBrand;
    if (minPrice !== "") query.min_price = minPrice;
    if (maxPrice !== "") query.max_price = maxPrice;

    router.push(
      {
        pathname: "/explore",
        query,
      },
      undefined,
      { shallow: true }
    );
    fetchProducts();
  };

  return (
    <div className="vstack">
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">Our Products</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <form className="accordion shadow-sm rounded" onSubmit={handleFilterSubmit}>
              {/* Categories Accordion */}
              <div className="accordion-item border-bottom">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#categories-collapse"
                    aria-expanded="true"
                  >
                    Categories
                  </button>
                </h2>
                <div id="categories-collapse" className="accordion-collapse collapse show">
                  <div className="accordion-body pt-2">
                    <div className="vstack gap-2">
                      {categories.map((category) => (
                        <div key={category.id} className="d-flex gap-2">
                          <input
                            type="radio"
                            name="category"
                            className="form-check-input"
                            value={category.id}
                            checked={selectedCategory === String(category.id)}
                            onChange={() => setSelectedCategory(String(category.id))}
                          />
                          <label className="fw-medium flex-grow-1">{category.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Brands Accordion */}
              <div className="accordion-item border-bottom">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#brands-collapse"
                    aria-expanded="true"
                  >
                    Brands
                  </button>
                </h2>
                <div id="brands-collapse" className="accordion-collapse collapse show">
                  <div className="accordion-body pt-2">
                    <div className="vstack gap-2">
                      {brands.map((brand) => (
                        <div key={brand.id} className="d-flex gap-2">
                          <input
                            type="radio"
                            name="brand"
                            className="form-check-input"
                            value={brand.id}
                            checked={selectedBrand === String(brand.id)}
                            onChange={() => setSelectedBrand(String(brand.id))}
                          />
                          <label className="fw-medium flex-grow-1">{brand.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Range Accordion */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button fw-bold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#price-collapse"
                    aria-expanded="true"
                  >
                    Price Range
                  </button>
                </h2>
                <div id="price-collapse" className="accordion-collapse collapse show">
                  <div className="accordion-body pt-0">
                    <div className="row g-3">
                      <div className="col-6">
                        <label className="form-label">Min</label>
                        <input
                          type="number"
                          className="form-control"
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                          placeholder="0"
                          min="0"
                        />
                      </div>
                      <div className="col-6">
                        <label className="form-label">Max</label>
                        <input
                          type="number"
                          className="form-control"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                          placeholder="1000"
                          min="0"
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                          {loading ? "Loading..." : "Apply Filters"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            <div className="hstack justify-content-between mb-3">
              <span className="text-dark">{loading ? "Loading..." : `${products.length} Items found`}</span>
            </div>

            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                {products.map((product) => (
                  <div key={product.id} className="col">
                    <ProductGridCard
                      id={product.id}
                      title={product.name}
                      price={product.price}
                      image={product.media?.[0]?.original_url || "/placeholder-image.jpg"}
                      off={product.off || 0} // Assuming off might be in product data
                      product={product} // Pass full product object
                      addToCart={addToCart} // Pass addToCart function
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreProducts;
