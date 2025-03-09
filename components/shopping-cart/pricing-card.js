import Link from "next/link";
import { useRouter } from "next/router"; // For redirect after success

function PricingCard({ subtotal = 0, total = 0, pricingOnly, onCheckout, children }) {
  const deliveryCharge = total - subtotal;
  const discount = 0;
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      await onCheckout(); // Call buyOrder from AppContext
      router.push("/checkout/success"); // Redirect to a success page (create this route)
    } catch (err) {
      console.error("Checkout failed:", err);
      // Error is already set in AppContext, so it’ll show in ShoppingCart
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString()}Ks</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount:</span>
            <span className="text-danger">{discount > 0 ? `-${discount.toLocaleString()}Ks` : "-"}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery charge:</span>
            <span className="text-success">
              {deliveryCharge > 0 ? `+${deliveryCharge.toLocaleString()}Ks` : "Free"}
            </span>
          </div>

          <hr className="text-muted" />

          <div className="d-flex justify-content-between">
            <span className="h5">Total:</span>
            <span className="fw-bold h5 mb-0">{total.toLocaleString()} Ks</span>
          </div>

          {!pricingOnly && (
            <div className="d-grid gap-2 mt-2">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
              <Link href="/">
                <a className="btn btn-outline-primary">Continue Shopping</a>
              </Link>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
