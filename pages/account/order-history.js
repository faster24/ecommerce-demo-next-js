import { useEffect, useState } from "react";
import AccountMenu from "../../components/account-menu";
import OrderHistoryItem from "../../components/account/order-history-item";
import Layout from "../../components/layout";
import { useAppContext } from "../../lib/AppContext";
import axiosInstance from "../../api/api.js";

function OrderHistory() {
  const { isAuthenticated, loading: contextLoading, error: contextError } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchOrderHistory = async () => {
    setFetchLoading(true);
    setFetchError(null);
    try {
      const response = await axiosInstance.get("/order/history"); // Fixed endpoint
      console.log(response.data)
      setOrders(response.data);
    } catch (err) {
      setFetchError(err.response?.data?.message || "Failed to fetch order history");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [isAuthenticated]);

  if (contextLoading || fetchLoading) return <div>Loading...</div>;
  if (contextError) return <div className="text-danger">Error: {contextError}</div>;
  if (fetchError) return <div className="text-danger">Error: {fetchError}</div>;

  return (
    <div>
      <div className="bg-secondary">
        <div className="container">
          <div className="row py-4 px-2">
            <nav aria-label="breadcrumb col-12">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Order History
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-3">
            <AccountMenu current="order-history" />
          </div>
          <div className="col-lg-9">
            {orders.length === 0 ? (
              <p>No order history found.</p>
            ) : (
              orders.map((order) => (
                <OrderHistoryItem
                  key={order.id}
                  id={order.id}
                  number={order.number}
                  status={order.status}
                  total={order.total_price}
                  shippingPrice={order.shipping_price}
                  shippingMethod={order.shipping_method}
                  shippingAddress={order.shipping_address}
                  items={order.items}
                  createdAt={order.created_at}
                  cancel={order.status === "cancelled"}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

OrderHistory.getLayout = (page) => {
  return <Layout simpleHeader>{page}</Layout>;
};

export default OrderHistory;
