import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function OrderHistoryItem({
  id,
  number,
  status,
  total,
  shippingPrice,
  shippingMethod,
  shippingAddress,
  items,
  createdAt,
  cancel,
}) {
  // Calculate subtotal from items (total_price includes shipping, so subtract it for subtotal)
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-header py-3 bg-white">
        <div className="row">
          <div className="col d-flex">
            <span className="fw-semibold h5 my-auto">Order #{number}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row gx-2 gy-3">
          <div className="col-md-5">
            <h6 className="fw-bold">Shipping Address</h6>
            {shippingAddress ? (
              <div className="vstack text-dark small">
                <span>{shippingAddress.street}</span>
                <span>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </span>
                <span>{shippingAddress.country}</span>
                {/* Assuming customer contact info might be added later */}
                <span>Tel: N/A</span>
                <span>Email: N/A</span>
              </div>
            ) : (
              <div className="text-dark small">No shipping address provided</div>
            )}
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Payment Method</h6>
            <div className="text-success">
              {shippingMethod === "cash_on_delivery" ? (
                <>
                  <span className="fw-bold">
                    <FontAwesomeIcon
                      icon={["fas", "money-bill-wave"]}
                      size="lg"
                    />
                  </span>
                  <span className="ms-2 small">Cash on Delivery</span>
                </>
              ) : (
                <>
                  <span className="fw-bold">
                    <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
                  </span>
                  <span className="ms-2 small">Credit Card (Ending in XXXX)</span>
                </>
              )}
            </div>
            <div>Subtotal: ${subtotal}</div>
            <div>Delivery Fee: ${shippingPrice}</div>
            <div className="fw-semibold">Total: ${total}</div>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Status</h6>
            <div className={cancel ? "text-danger" : "text-success"}>
              <span className="fw-semibold">
                {status.toUpperCase()} {cancel && "(Cancelled)"}
              </span>
            </div>
            <h6 className="fw-bold mt-3">Items</h6>
            <ul className="list-unstyled small">
              {items.map((item) => (
                <li key={item.product_id}>
                  <strong>{item.product_name}</strong> - Qty: {item.quantity} - ${item.total}
                  {item.product_description && (
                    <p className="text-muted">{item.product_description}</p>
                  )}
                  {item.product_image && (
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      style={{ width: "30px", height: "30px", marginLeft: "10px" }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="card-footer small border-0 py-3 text-muted">
        Order Date: {new Date(createdAt).toDateString()}
      </div>
    </div>
  );
}

OrderHistoryItem.propTypes = {
  id: PropTypes.number.isRequired,
  number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  shippingPrice: PropTypes.number.isRequired,
  shippingMethod: PropTypes.string.isRequired,
  shippingAddress: PropTypes.shape({
    country: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      product_id: PropTypes.number,
      product_name: PropTypes.string,
      quantity: PropTypes.number,
      unit_price: PropTypes.number,
      total: PropTypes.number,
      product_description: PropTypes.string,
      product_image: PropTypes.string,
      product_category: PropTypes.string,
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  cancel: PropTypes.bool,
};

export default OrderHistoryItem;
