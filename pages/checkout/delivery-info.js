import Link from "next/link";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import PricingCard from "../../components/shopping-cart/pricing-card";
import Layout from "../../components/layout";
import { useAppContext } from "../../lib/AppContext";
import { useState, useEffect } from "react";

function DeliveryInfo() {
  const { cart, subtotal, total, deliveryInfo, updateDeliveryInfo } = useAppContext();
  
  // Initialize formData with context deliveryInfo
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

  // Sync local state with context when deliveryInfo changes
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

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Save form data to context when continuing
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
              <form className="row g-3" onSubmit={handleContinue}>
                <h4 className="fw-semibold mb-0">Contact Info</h4>
                <div className="col-md-6">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone</label>
                  <div className="input-group">
                    <div>
                      <select
                        className="form-select rounded-0 rounded-start bg-light"
                        name="phonePrefix"
                        value="+95"
                        disabled
                      >
                        <option>+95</option>
                      </select>
                    </div>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="name@domain.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <hr className="text-muted mb-0" />
                </div>

                <h4 className="fw-semibold mb-0">Shipping Info</h4>
                <div className="col-md-12">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">City</label>
                  <select
                    className="form-select"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select City</option>
                    <option value="Yangon">Yangon</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Area</label>
                  <select
                    className="form-select"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Area</option>
                    <option value="Thar Kay Ta">Thar Kay Ta</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="saveAddress"
                      checked={formData.saveAddress}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label">
                      Save this address
                    </label>
                  </div>
                </div>

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
