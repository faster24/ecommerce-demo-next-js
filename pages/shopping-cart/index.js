import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItemRow from "../../components/shopping-cart/cart-item-row";
import PricingCard from "../../components/shopping-cart/pricing-card";
import { useAppContext } from "../../lib/AppContext";

function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, subtotal, total, loading, error, buyOrder } = useAppContext();

  if (loading) {
    return (
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-2">
                <p className="text-muted">Loading cart...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-2">
                <p className="text-danger">Error: {error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h5 className="my-2">Shopping Cart ({cart.length} items)</h5>
            </div>
            <div className="card-body p-2">
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <CartItemRow
                        key={item.id}
                        product={item}
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        onRemove={() => removeFromCart(item.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer py-3">
              <small>
                <FontAwesomeIcon
                  icon={["fas", "truck"]}
                  className="text-success me-2"
                />
                Delivery within 1-2 weeks
              </small>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card mb-3 border-0 shadow-sm">
          </div>
          <PricingCard subtotal={subtotal} total={total} onCheckout={buyOrder} />
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default ShoppingCart;
