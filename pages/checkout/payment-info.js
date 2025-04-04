import Link from "next/link";
import { useState } from "react";
import CheckoutStepper from "../../components/checkout/checkout-stepper";
import PaymentOptionCheck from "../../components/checkout/payment-option-check";
import Layout from "../../components/layout";
import PricingCard from "../../components/shopping-cart/pricing-card";
import { useAppContext } from "../../lib/AppContext"; // Import context

function PaymentInfo() {
  const { subtotal, total } = useAppContext(); // Access pricing data from context
  const [option, setOption] = useState("visa");

  function handlePaymentOptionChange(name) {
    setOption(name);
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <CheckoutStepper step={2} />
        </div>
      </div>
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-semibold mb-3">Payment Method</h4>
              <form className="row g-3">
                <div className="col-md-12">
                  <div className="d-flex flex-wrap gap-2">
                    <PaymentOptionCheck
                      name="cod"
                      title="Cash on delivery"
                      checked={option === "cod"}
                      onCheckedChanged={setOption}
                    />
                    <PaymentOptionCheck
                      name="mpu"
                      title="MPU"
                      checked={option === "mpu"}
                      onCheckedChanged={setOption}
                    />
                    <PaymentOptionCheck
                      name="visa"
                      title="VISA"
                      checked={option === "visa"}
                      onCheckedChanged={setOption}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Name on card</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-12">
                  <div className="hstack gap-2">
                    <div className="flex-grow-1">
                      <label className="form-label">Card number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="123"
                        size={5}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row g-2">
                    <div className="col">
                      <label className="form-label">Expiry</label>
                      <select className="form-select">
                        <option value="">Month</option>
                        <option value="01">January</option>
                        <option value="02">February</option>
                        <option value="03">March</option>
                        <option value="04">April</option>
                        <option value="05">May</option>
                        <option value="06">June</option>
                        <option value="07">July</option>
                        <option value="08">August</option>
                        <option value="09">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                      </select>
                    </div>
                    <div className="col mt-auto">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Year"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-12 mt-4">
                  <div className="d-grid gap-2 d-flex justify-content-end">
                    <Link href="/checkout/delivery-info">
                      <a className="btn btn-outline-primary">Back</a>
                    </Link>
                    <Link href="/checkout/confirm-checkout">
                      <a className="btn btn-primary">Continue</a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <PricingCard
            pricingOnly // Keep pricing-only as per original design
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

PaymentInfo.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default PaymentInfo;
