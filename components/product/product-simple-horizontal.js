import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function ProductSimpleHorizontal({ id , image , name , price  , stock}) {

  // Determine stock status
  const isInStock = stock > 0;
  const stockStatus = isInStock ? "In Stock" : "Out of Stock";
  const stockStatusClass = isInStock ? "text-success" : "text-danger";

  return (

    <div className="d-flex py-2">
      <div className="flex-shink-0" style={{ height: 80 }}>
        <img
          className="rounded"
          src={image}
          width={80}
          height={80}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="d-flex flex-column flex-grow-1 ms-3">
        <Link href={`/product/${id}`}>
          <a className="text-dark text-decoration-none">{name}</a>
        </Link>
        <h6 className="mb-0 fw-semibold">{price} Ks</h6>
        <div className="mt-auto">
          <button 
            className="btn btn-sm btn-secondary text-primary rounded-3"
            disabled={isInStock}
          >
            <FontAwesomeIcon icon={("fas", "cart-plus")} />
            &nbsp;Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductSimpleHorizontal;
