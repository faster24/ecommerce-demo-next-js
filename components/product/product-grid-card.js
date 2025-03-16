import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ProductGridCard({ id, title, off, image, price, product, addToCart }) {
  let percentOff;
  let offPrice = `${price}Ks`;

  if (off && off > 0) {
    percentOff = (
      <div
        className="badge bg-dark opacity-75 py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {off}% OFF
      </div>
    );

    offPrice = (
      <>
        {price - (off * price) / 100}Ks{" "}
        <del className="text-muted small fw-normal">{price}Ks</del>
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product); // Use the full product object from props
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <Link href={`/product/${id}`}>
        <a>
          <div className="ratio ratio-1x1">
            <img
              className="card-img-top"
              src={image || "/placeholder-image.jpg"} // Fallback image
              alt="Product image."
              style={{ objectFit: "cover" }}
            />
          </div>
          {percentOff}
        </a>
      </Link>
      <div className="card-body">
        <div className="vstack gap-2">
          <Link href={`/product/${id}`}>
            <a className="text-dark text-decoration-none">{title}</a>
          </Link>

          <h6 className="fw-semibold">{offPrice}</h6>

          <div className="hstack gap-2">
            {/* Mobile/Tablet View (md and below) */}
            <button
              className="btn btn-secondary text-primary flex-grow-1 d-md-block d-lg-none"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to Cart
            </button>
            <button className="btn btn-outline-secondary text-primary border d-md-block d-lg-none">
              <FontAwesomeIcon icon={["far", "heart"]} />
            </button>

            {/* Desktop View (lg and above) */}
            <button
              className="btn btn-sm btn-secondary text-primary flex-grow-1 d-none d-lg-block"
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to Cart
            </button>
            <button className="btn btn-sm btn-outline-secondary text-primary border d-none d-lg-block">
              <FontAwesomeIcon icon={["far", "heart"]} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridCard;
