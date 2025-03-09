import Link from "next/link";
import ProductRating from "../product-rating";

function ProductSimpleCard({ id, title , price, image }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="ratio ratio-1x1">
        <img
          className="card-img-top"
          src={`${image}`}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <Link href={`product/${id}`}>
          <a className="mb-1 text-dark text-decoration-none stretched-link">
            {title}
          </a>
        </Link>

        <h6 className="mb-0 fw-semibold mt-2">{price} MMK</h6>
      </div>
    </div>
  );
}

export default ProductSimpleCard;
