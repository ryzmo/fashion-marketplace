import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LoadingBar from "./LoadingBar"; // Pastikan path benar

export const CartContext = createContext();

export default function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const handleStart = () => setIsRouteLoading(true);
    const handleStop = () => setIsRouteLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {isRouteLoading && <LoadingBar />}

      <Script
        type="text/javascript"
        src="https://api.goaffpro.com/loader.js?shop=aektdccnpq"
        strategy="afterInteractive"
      />

      <Component {...pageProps} />

      {/* ✅ Tambahkan di bawah komponen utama */}
      <Analytics />
      <SpeedInsights />
    </CartContext.Provider>
  );
}
