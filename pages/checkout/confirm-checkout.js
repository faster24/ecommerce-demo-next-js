import { useRouter } from "next/router";
import Link from "next/link";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import ReviewCartItem from "../../components/checkout/review-cart-item";
import Layout from "../../components/layout";
import PricingCard from "../../components/shopping-cart/pricing-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../../lib/AppContext";
import { useState } from "react";

function ConfirmCheckout() {
  const router = useRouter();
  const { cart, subtotal, total, deliveryInfo, buyOrder } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle confirm button click with checkout
  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Call buyOrder from AppContext to process the checkout
      const orderResponse = await buyOrder();
      
      if (orderResponse) {
        // Successfully placed order, redirect to success page
        router.push("/checkout/checkout-success");
      }
    } catch (err) {
      // Handle any errors from the buyOrder function
      setError("Failed to process your order. Please try again.");
      console.error("Checkout error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <CheckoutStepper step={3} />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">Items in cart</h4>
              <div className="row row-cols-1 row-cols-md-2 g-3">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div className="col" key={item.id}>
                      <ReviewCartItem item={item} />
                    </div>
                  ))
                ) : (
                  <div className="col">
                    <p className="text-muted">No items in cart</p>
                  </div>
                )}
              </div>
              <hr className="text-muted" />
              <div className="row g-3">
                <div className="col-md-6">
                  <h4 className="fw-semibold">Payment Method</h4>
                  <div className="d-flex gap-3 text-success">
                    <span className="fw-bold">
                      <FontAwesomeIcon icon={["fab", "cc-visa"]} size="lg" />
                    </span>
                    <div className="vstack small text-muted">
                      <span>XXXX-XXXX-XXXX-2345</span>
                      <span>Exp: 03/25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <PricingCard pricingOnly subtotal={subtotal} total={total}>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="mt-3 d-grid gap-2">
              <button
                className="btn btn-primary"
                onClick={handleConfirm}
                disabled={isSubmitting || cart.length === 0}
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </button>
              <Link href="/checkout/payment-info">
                <a className="btn btn-outline-primary">Return</a>
              </Link>
            </div>
          </PricingCard>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

ConfirmCheckout.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default ConfirmCheckout;
