import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/api.js";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    postalCode: "",
    saveAddress: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    } else {
      setIsAuthenticated(false);
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      const productData = response.data;
      setProducts([productData]);
      updateCartWithProductData([productData]);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const updateCartWithProductData = (products) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const fullProduct = products.find((p) => p.id === item.id);
        return fullProduct ? { ...item, ...fullProduct } : item;
      })
    );
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/login", { email, password });
      const { customer, token } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setUser(customer);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      setCart([]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shippingFee = 5.00;
  const total = subtotal + shippingFee;

  const buyOrder = async () => {
    if (!isAuthenticated) {
      setError("Please log in to place an order");
      return;
    }
    if (cart.length === 0) {
      setError("Cart is empty");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        user_id: user?.id || 1,
        cart: cart.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: parseFloat(item.price),
        })),
        shipping_address: {
          country: "USA",
          street: "Bothahtuang Street",
          city: "Yangon",
          state: "Mayangone",
          zip: "2300",
          firstName: "Dr.MyoKo",
          lastName: "Htun",
          phone: "0823450645",
          email: "sofia.dev@mail.com",
        },
      };
      const response = await axiosInstance.post("/order/buyOrder", payload);
      console.log("Order placed successfully:", response.data);
      setCart([]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to place order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/profile");
      const customer = response.data.customer;
      setUser(customer);
      setIsAuthenticated(true);
      setError(null);
      return customer;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch profile");
      setIsAuthenticated(false);
      localStorage.removeItem("token");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    if (!isAuthenticated) {
      setError("Please log in to update profile");
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.put("/profile", profileData);
      const customer = response.data.customer;
      setUser(customer);
      setError(null);
      return customer;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryInfo = (newDeliveryInfo) => {
    setDeliveryInfo((prev) => ({
      ...prev,
      ...newDeliveryInfo,
    }));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        total,
        products,
        loading,
        error,
        buyOrder,
        getProfile,
        updateProfile,
        deliveryInfo,
        updateDeliveryInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
