import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function CartItemRow({ product, quantity, onIncrease, onDecrease, onRemove }) {
  console.log(product);
  const getQtyInput = () => {
    return (
      <div className="input-group input-group-sm" style={{ width: 100 }}>
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={onDecrease}
        >
          <FontAwesomeIcon icon={["fas", "minus"]} />
        </button>
        <input
          type="text"
          className="form-control text-center border-primary"
          value={quantity}
          size="2"
          readOnly
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={onIncrease}
        >
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </button>
      </div>
    );
  };

  return (
    <tr>
      <td scope="row">
        <div className="hstack">
          <img
            className="rounded"
            src={product.image || product.image_urls[0]}
            width={80}
            height={80}
            alt={product.name || "Product image"}
            style={{ objectFit: "cover" }}
          />
          <div className="ms-3">
            <span className="h5">
              <Link href={`/product/${product.id}`}>
                <a className="link-dark text-decoration-none">{product.name}</a>
              </Link>
            </span>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0">{product.price}Ks</h6>
      </td>
      <td>
        <div className="d-flex">{getQtyInput()}</div>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          type="button"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;
