import Link from "next/link";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import PricingCard from "../../components/shopping-cart/pricing-card";
import Layout from "../../components/layout";
import { useAppContext } from "../../lib/AppContext";
import { useState, useEffect } from "react";

function DeliveryInfo() {
  const { cart, subtotal, total, deliveryInfo, updateDeliveryInfo } = useAppContext();

  const [formData, setFormData] = useState({
    firstName: deliveryInfo.firstName || "",
    lastName: deliveryInfo.lastName || "",
    phone: deliveryInfo.phone || "",
    email: deliveryInfo.email || "",
    address: deliveryInfo.address || "",
    city: deliveryInfo.city || "",
    area: deliveryInfo.area || "",
    postalCode: deliveryInfo.postalCode || "",
    saveAddress: deliveryInfo.saveAddress || false,
  });

  useEffect(() => {
    setFormData({
      firstName: deliveryInfo.firstName || "",
      lastName: deliveryInfo.lastName || "",
      phone: deliveryInfo.phone || "",
      email: deliveryInfo.email || "",
      address: deliveryInfo.address || "",
      city: deliveryInfo.city || "",
      area: deliveryInfo.area || "",
      postalCode: deliveryInfo.postalCode || "",
      saveAddress: deliveryInfo.saveAddress || false,
    });
  }, [deliveryInfo]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    updateDeliveryInfo(formData);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <CheckoutStepper />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Add Product Information Section */}
              <h4 className="fw-semibold mb-3">Order Summary</h4>
              {cart.length > 0 ? (
                <ul className="list-group mb-3">
                  {cart.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{item.name}</strong>
                        <br />
                        <small>Price: {item.price}Ks | Quantity: {item.quantity}</small>
                      </div>
                      <span>{(parseFloat(item.price) * item.quantity).toFixed(2)}Ks</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items in cart.</p>
              )}

              <form className="row g-3" onSubmit={handleContinue}>
                <h4 className="fw-semibold mb-0">Contact Info</h4>
                {/* ... (rest of the form remains the same) */}
                <div className="col-md-12 mt-4">
                  <div className="d-grid gap-2 d-flex justify-content-end">
                    <Link href="/shopping-cart">
                      <button type="button" className="btn btn-outline-primary">
                        Cancel
                      </button>
                    </Link>
                    <Link href="/checkout/payment-info">
                      <button type="submit" className="btn btn-primary">
                        Continue
                      </button>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <PricingCard
            pricingOnly
            subtotal={subtotal}
            total={total}
          />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

DeliveryInfo.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default DeliveryInfo;
