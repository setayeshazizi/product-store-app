import React, { useContext } from "react";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Stack,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  Delete,
  Add,
  Remove,
  ShoppingBag,
  ArrowBack,
  LocalMall,
  Receipt,
  CreditCard,
  Diamond,
  VerifiedUser,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppSettingsContext } from "../context/ThemeContext";

const CartPage = () => {
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: settings } = useContext(AppSettingsContext);
  const isDark = settings.mode === "dark";

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // Empty Cart
  if (items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              py: 10,
              px: 4,
              borderRadius: "32px",
              bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
              }`,
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <LocalMall
                sx={{ fontSize: 100, color: "#00d2ff", opacity: 0.3, mb: 3 }}
              />
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
              Your Cart is Empty
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
            >
              Looks like you haven't added anything to your cart yet. Let's go
              shopping!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              startIcon={<ShoppingBag />}
              sx={{
                bgcolor: "#00d2ff",
                color: "#050a18",
                fontWeight: 800,
                borderRadius: "16px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#00b8e6",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Browse Products
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container maxWidth="lg">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
            <IconButton
              onClick={() => navigate("/")}
              sx={{
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }`,
                borderRadius: "14px",
                "&:hover": {
                  bgcolor: "rgba(0,210,255,0.1)",
                  border: "1px solid #00d2ff",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 0.5,
                }}
              >
                <Diamond sx={{ color: "#00d2ff", fontSize: 24 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: "-0.5px",
                    background: isDark
                      ? "linear-gradient(135deg, #fff 0%, #a1a1aa 100%)"
                      : "linear-gradient(135deg, #09090b 0%, #52525b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Shopping Cart
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, ml: 0.5 }}
              >
                <VerifiedUser sx={{ fontSize: 14, color: "#4CAF50" }} />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"} ·
                  Secured Checkout
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Main Layout*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* Cart Items */}
          <Box sx={{ flex: 1, maxWidth: { md: 650 } }}>
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 50, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      mb: 2,
                      p: 2.5,
                      borderRadius: "24px",
                      bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                      }`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        border: `1px solid ${
                          isDark ? "rgba(0,210,255,0.2)" : "rgba(0,210,255,0.3)"
                        }`,
                        boxShadow: isDark
                          ? "0 10px 30px rgba(0,210,255,0.08)"
                          : "0 10px 30px rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2.5,
                        alignItems: "center",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                      }}
                    >
                      {/* Image */}
                      <Box
                        onClick={() => navigate(`/product/${item.id}`)}
                        sx={{
                          width: 80,
                          height: 80,
                          minWidth: 80,
                          borderRadius: "16px",
                          bgcolor: isDark ? "#0a0f1a" : "#fafafa",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          overflow: "hidden",
                          border: `1px solid ${
                            isDark
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)"
                          }`,
                          "& img": { transition: "transform 0.4s ease" },
                          "&:hover img": { transform: "scale(1.1)" },
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          style={{
                            width: "65%",
                            height: "65%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>

                      {/* Info */}
                      <Box sx={{ flex: 1, minWidth: 150 }}>
                        <Typography
                          variant="subtitle2"
                          onClick={() => navigate(`/product/${item.id}`)}
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            mb: 0.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor: "pointer",
                            "&:hover": { color: "#00d2ff" },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            textTransform: "uppercase",
                            fontWeight: 600,
                            letterSpacing: 0.5,
                          }}
                        >
                          {item.category}
                        </Typography>

                        {/* Quantity & Price Row */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                              disabled={item.quantity <= 1}
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "8px",
                                bgcolor: isDark
                                  ? "rgba(255,255,255,0.03)"
                                  : "rgba(0,0,0,0.03)",
                                "&:hover": { bgcolor: "rgba(0,210,255,0.1)" },
                              }}
                            >
                              <Remove sx={{ fontSize: 14 }} />
                            </IconButton>
                            <Typography
                              sx={{
                                fontWeight: 700,
                                minWidth: 24,
                                textAlign: "center",
                                fontSize: "0.9rem",
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                dispatch(incrementQuantity(item.id))
                              }
                              sx={{
                                width: 28,
                                height: 28,
                                borderRadius: "8px",
                                bgcolor: isDark
                                  ? "rgba(255,255,255,0.03)"
                                  : "rgba(0,0,0,0.03)",
                                "&:hover": { bgcolor: "rgba(0,210,255,0.1)" },
                              }}
                            >
                              <Add sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>

                          <Typography
                            sx={{
                              fontWeight: 800,
                              fontSize: "1rem",
                              color: "#00d2ff",
                            }}
                          >
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Remove */}
                      <IconButton
                        onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{
                          color: "#f5576c",
                          opacity: 0.5,
                          "&:hover": {
                            opacity: 1,
                            bgcolor: "rgba(245, 87, 108, 0.1)",
                            transform: "rotate(8deg)",
                          },
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>

          {/* Order Summary - Sidebar */}
          <Box sx={{ width: { xs: "100%", md: 340 }, flexShrink: 0 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "28px",
                  bgcolor: isDark ? "rgba(255,255,255,0.03)" : "#fff",
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${
                    isDark ? "rgba(0,210,255,0.1)" : "rgba(0,210,255,0.15)"
                  }`,
                  position: "sticky",
                  top: 100,
                  boxShadow: isDark
                    ? "0 20px 40px rgba(0,210,255,0.05)"
                    : "0 20px 40px rgba(0,0,0,0.03)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 4,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "rgba(0,210,255,0.1)",
                      borderRadius: "12px",
                      p: 1,
                    }}
                  >
                    <Receipt sx={{ color: "#00d2ff" }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Order Summary
                  </Typography>
                </Box>

                <Stack spacing={2.5}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Subtotal ({totalQuantity} items)
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Shipping
                    </Typography>
                    <Typography sx={{ fontWeight: 600, color: "#4CAF50" }}>
                      FREE
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Tax (10%)
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ${(totalPrice * 0.1).toFixed(2)}
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(0,0,0,0.06)",
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      bgcolor: isDark
                        ? "rgba(0,210,255,0.05)"
                        : "rgba(0,210,255,0.03)",
                      p: 2,
                      borderRadius: "16px",
                      border: `1px solid ${
                        isDark ? "rgba(0,210,255,0.15)" : "rgba(0,210,255,0.1)"
                      }`,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                      Total
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 900, color: "#00d2ff" }}
                    >
                      ${(totalPrice * 1.1).toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={2} sx={{ mt: 4 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleCheckout}
                    startIcon={<CreditCard />}
                    sx={{
                      bgcolor: "#00d2ff",
                      color: "#050a18",
                      fontWeight: 800,
                      borderRadius: "16px",
                      py: 1.8,
                      textTransform: "none",
                      fontSize: "1.05rem",
                      "&:hover": {
                        bgcolor: "#00b8e6",
                        transform: "translateY(-2px)",
                        boxShadow: "0 15px 30px rgba(0,210,255,0.3)",
                      },
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => dispatch(clearCart())}
                    startIcon={<Delete />}
                    sx={{
                      borderColor: isDark
                        ? "rgba(245,87,108,0.2)"
                        : "rgba(245,87,108,0.2)",
                      color: "#f5576c",
                      fontWeight: 700,
                      borderRadius: "16px",
                      py: 1.3,
                      textTransform: "none",
                      fontSize: "0.9rem",
                      "&:hover": {
                        borderColor: "#f5576c",
                        bgcolor: "rgba(245,87,108,0.05)",
                      },
                    }}
                  >
                    Clear Cart
                  </Button>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                      mt: 1,
                    }}
                  >
                    <VerifiedUser sx={{ fontSize: 14, color: "#4CAF50" }} />
                    <Typography variant="caption" color="text.secondary">
                      Secure SSL Encrypted Payment
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
