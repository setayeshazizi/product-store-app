import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, py: 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
}

export default App;
