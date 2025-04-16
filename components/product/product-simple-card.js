import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ProductSimpleCard({ id, title, price, image, product, addToCart }) {
  const handleAddToCart = () => {
    addToCart(product); // Use the full product object from props
  };

  // Determine stock status
  const isInStock = product.stock_qty > 0;
  const stockStatus = isInStock ? "In Stock" : "Out of Stock";
  const stockStatusClass = isInStock ? "text-success" : "text-danger";

  return (
    <div className="card h-100 border-0 shadow-sm">
      <Link href={`/product/${id}`}>
        <a className="text-decoration-none">
          <img
            src={image || "/images/placeholder.jpg"}
            alt={title}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </a>
      </Link>
      <div className="card-body">
        <h5 className="card-title fw-bold">{title}</h5>
        <p className="card-text text-dark">${parseFloat(price).toFixed(2)}</p>
        <p className={`card-text small ${stockStatusClass}`}>
          {stockStatus}
        </p>
      </div>
      <div className="card-footer bg-transparent border-0">
        <button
          className="btn btn-primary w-100"
          onClick={handleAddToCart}
          disabled={!isInStock}
        >
          <FontAwesomeIcon icon={["fas", "cart-plus"]} className="me-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
