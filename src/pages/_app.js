import { createContext, useState, useEffect } from "react";
import "@/styles/globals.css";

export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);

  // Ambil data dari localStorage saat pertama kali dimuat
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Simpan data ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
