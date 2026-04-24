import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/productService";
import {
  Container,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Divider,
  Paper,
  IconButton,
  Stack,
  Skeleton,
  Alert,
  AlertTitle,
  Tooltip,
  Snackbar,
} from "@mui/material";
import {
  ShoppingCart,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Share,
  LocalShipping,
  Verified,
  Payment,
  Diamond,
  Bolt,
  Shield,
  Replay,
  Star,
  TrendingUp,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { AppSettingsContext } from "../context/ThemeContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: settings } = useContext(AppSettingsContext);
  const isDark = settings.mode === "dark";

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFeatureToast, setShowFeatureToast] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { items: cartItems } = useSelector((state) => state.cart);
  const isInCart = cartItems.some((item) => item.id === parseInt(id));

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const product = products?.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setSnackbarMessage("✅ Added to cart successfully!");
    setShowSnackbar(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: `Check out ${product.title} for $${product.price}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setSnackbarMessage("📋 Link copied to clipboard!");
      setShowSnackbar(true);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    setSnackbarMessage(
      isWishlisted ? " Removed from wishlist" : "Added to wishlist!"
    );
    setShowSnackbar(true);
  };

  const handleFeatureClick = (message) => {
    setShowFeatureToast(message);
    setTimeout(() => setShowFeatureToast(null), 4000);
  };

  // Related Products
  const relatedProducts =
    products
      ?.filter((p) => p.category === product?.category && p.id !== product?.id)
      .slice(0, 4) || [];

  // Loading State
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box
          sx={{
            display: "flex",
            gap: 6,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Skeleton
            variant="rounded"
            width="100%"
            height={500}
            sx={{ borderRadius: "40px", flex: 1 }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" height={60} width="80%" />
            <Skeleton variant="text" height={40} width="30%" sx={{ mt: 2 }} />
            <Skeleton
              variant="rounded"
              height={120}
              sx={{ mt: 3, borderRadius: "20px" }}
            />
            <Skeleton
              variant="rounded"
              height={60}
              sx={{ mt: 4, borderRadius: "16px" }}
            />
          </Box>
        </Box>
      </Container>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: "24px",
            p: 4,
            backdropFilter: "blur(10px)",
            bgcolor: isDark
              ? "rgba(211, 47, 47, 0.08)"
              : "rgba(211, 47, 47, 0.04)",
          }}
          action={
            <Button color="inherit" size="large" onClick={() => navigate("/")}>
              Go Home
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 700 }}>Product Not Found</AlertTitle>
          The product you're looking for doesn't exist or has been removed.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        
        {/* Top Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 5,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                color: "text.primary",
                fontWeight: 600,
                borderRadius: "12px",
                px: 2,
                py: 1,
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                },
              }}
            >
              Back
            </Button>

            <Stack direction="row" spacing={1}>
              <Tooltip title="Share Product" arrow>
                <IconButton
                  onClick={handleShare}
                  sx={{
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                    }`,
                    borderRadius: "14px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(0,210,255,0.1)",
                      border: "1px solid #00d2ff",
                      color: "#00d2ff",
                    },
                  }}
                >
                  <Share />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
                arrow
              >
                <IconButton
                  onClick={handleWishlist}
                  sx={{
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                    }`,
                    borderRadius: "14px",
                    color: isWishlisted ? "#f5576c" : "inherit",
                    bgcolor: isWishlisted
                      ? "rgba(245, 87, 108, 0.1)"
                      : "transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      bgcolor: "rgba(245, 87, 108, 0.15)",
                      border: "1px solid #f5576c",
                      color: "#f5576c",
                    },
                  }}
                >
                  {isWishlisted ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>
        </motion.div>

        {/* Main Product Section */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 4, md: 8 },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          {/* Left - Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: 1 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 6 },
                borderRadius: "40px",
                bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                backdropFilter: "blur(20px)",
                border: `1px solid ${
                  isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                }`,
                position: "sticky",
                top: 100,
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Category Badge */}
              <Chip
                label={product.category}
                size="small"
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  fontSize: "0.65rem",
                  borderRadius: "10px",
                  bgcolor: "#00d2ff",
                  color: "#050a18",
                }}
              />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    maxHeight: "450px",
                    objectFit: "contain",
                    filter: isDark
                      ? "drop-shadow(0 20px 40px rgba(0,210,255,0.15))"
                      : "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
                  }}
                />
              </motion.div>
            </Paper>
          </motion.div>

          {/* Right - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: 1 }}
          >
            {/* Category & Brand */}
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip
                icon={<Diamond sx={{ fontSize: 14 }} />}
                label={product.category}
                size="small"
                sx={{
                  fontWeight: 600,
                  borderRadius: "10px",
                  bgcolor: isDark
                    ? "rgba(0,210,255,0.1)"
                    : "rgba(0,210,255,0.05)",
                  color: "#00d2ff",
                  border: "1px solid rgba(0,210,255,0.2)",
                }}
              />
              <Chip
                icon={<Star sx={{ fontSize: 14 }} />}
                label="Best Seller"
                size="small"
                sx={{
                  fontWeight: 600,
                  borderRadius: "10px",
                  bgcolor: isDark
                    ? "rgba(255,184,0,0.1)"
                    : "rgba(255,184,0,0.05)",
                  color: "#FFB800",
                  border: "1px solid rgba(255,184,0,0.2)",
                }}
              />
            </Stack>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", md: "2.5rem" },
                letterSpacing: "-1px",
                lineHeight: 1.2,
                mb: 2,
                background: isDark
                  ? "linear-gradient(135deg, #fff 0%, #a1a1aa 100%)"
                  : "linear-gradient(135deg, #09090b 0%, #3f3f46 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {product.title}
            </Typography>

            {/* Rating */}
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}
            >
              <Rating
                value={product.rating?.rate || 4.5}
                precision={0.5}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": { color: "#FFB800" },
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {product.rating?.rate || 4.5}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({product.rating?.count || 100} reviews)
              </Typography>
              <Verified sx={{ fontSize: 18, color: "#4CAF50", ml: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Verified
              </Typography>
            </Box>

            {/* Price */}
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 2,
                mb: 4,
                p: 2.5,
                borderRadius: "20px",
                bgcolor: isDark
                  ? "rgba(0,210,255,0.05)"
                  : "rgba(0,210,255,0.03)",
                border: `1px solid ${
                  isDark ? "rgba(0,210,255,0.12)" : "rgba(0,210,255,0.08)"
                }`,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "#00d2ff",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                }}
              >
                ${product.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ${(product.price * 1.2).toFixed(2)}
              </Typography>
              <Chip
                label="20% OFF"
                size="small"
                sx={{
                  fontWeight: 700,
                  bgcolor: "#f5576c",
                  color: "#fff",
                  borderRadius: "8px",
                  ml: 1,
                }}
              />
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.8,
                fontSize: "1rem",
              }}
            >
              {product.description ||
                "Experience the pinnacle of quality and design. This premium product combines innovative technology with elegant aesthetics to deliver an unparalleled user experience."}
            </Typography>

            <Divider
              sx={{
                mb: 4,
                borderColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.05)",
              }}
            />

            {/* Features - Interactive with Click */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 4 }}>
              {[
                {
                  icon: <LocalShipping />,
                  label: "Free Shipping",
                  message:
                    "Free shipping on all orders over $50! Delivery in 2-5 business days worldwide.",
                },
                {
                  icon: <Replay />,
                  label: "30-Day Returns",
                  message:
                    "↩ Not satisfied? Return any product within 30 days for a full refund. No questions asked.",
                },
                {
                  icon: <Shield />,
                  label: "2-Year Warranty",
                  message:
                    "All products come with a 2-year manufacturer warranty against defects.",
                },
                {
                  icon: <Payment />,
                  label: "Secure Payment",
                  message:
                    "Your payment information is encrypted with 256-bit SSL security. Safe & secure.",
                },
              ].map((feature, i) => (
                <Box
                  key={i}
                  onClick={() => handleFeatureClick(feature.message)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    p: 1.5,
                    borderRadius: "14px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.01)",
                    border: `1px solid ${
                      isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
                    }`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      border: "1px solid rgba(0,210,255,0.2)",
                      bgcolor: isDark
                        ? "rgba(0,210,255,0.06)"
                        : "rgba(0,210,255,0.03)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "#00d2ff",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    {feature.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Feature Toast Message */}
            <AnimatePresence>
              {showFeatureToast && (
                <motion.div
                  initial={{ opacity: 0, y: 20, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 20, height: 0 }}
                  style={{ marginBottom: 20, overflow: "hidden" }}
                >
                  <Alert
                    severity="info"
                    onClose={() => setShowFeatureToast(null)}
                    icon={false}
                    sx={{
                      borderRadius: "16px",
                      bgcolor: isDark
                        ? "rgba(0,210,255,0.1)"
                        : "rgba(0,210,255,0.05)",
                      border: `1px solid ${
                        isDark ? "rgba(0,210,255,0.2)" : "rgba(0,210,255,0.15)"
                      }`,
                      "& .MuiAlert-message": {
                        fontWeight: 500,
                        fontSize: "0.9rem",
                        color: "text.primary",
                      },
                    }}
                  >
                    {showFeatureToast}
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Add to Cart Button */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {isInCart ? (
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/cart")}
                  startIcon={<ShoppingCart />}
                  sx={{
                    borderColor: "#00d2ff",
                    color: "#00d2ff",
                    fontWeight: 800,
                    borderRadius: "18px",
                    py: 1.8,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      borderColor: "#00d2ff",
                      bgcolor: "rgba(0,210,255,0.08)",
                    },
                  }}
                >
                  View in Cart
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleAddToCart}
                  startIcon={<ShoppingCart />}
                  sx={{
                    bgcolor: "#00d2ff",
                    color: "#050a18",
                    fontWeight: 800,
                    borderRadius: "18px",
                    py: 1.8,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": {
                      bgcolor: "#00b8e6",
                      transform: "translateY(-2px)",
                      boxShadow: "0 15px 30px rgba(0,210,255,0.3)",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              )}

              <IconButton
                onClick={handleWishlist}
                sx={{
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                  }`,
                  borderRadius: "18px",
                  width: 60,
                  height: 60,
                  color: isWishlisted ? "#f5576c" : "inherit",
                  bgcolor: isWishlisted
                    ? "rgba(245, 87, 108, 0.1)"
                    : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "rgba(245, 87, 108, 0.15)",
                    border: "1px solid #f5576c",
                    color: "#f5576c",
                  },
                }}
              >
                {isWishlisted ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </motion.div>
        </Box>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <Box sx={{ mt: 10 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}
              >
                <TrendingUp sx={{ color: "#00d2ff", fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  You Might Also Like
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(4, 1fr)",
                  },
                  gap: 3,
                }}
              >
                {relatedProducts.map((related) => (
                  <motion.div
                    key={related.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Paper
                      elevation={0}
                      onClick={() => navigate(`/product/${related.id}`)}
                      sx={{
                        p: 3,
                        borderRadius: "24px",
                        bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)"
                        }`,
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        textAlign: "center",
                        "&:hover": {
                          border: "1px solid rgba(0,210,255,0.15)",
                          boxShadow: isDark
                            ? "0 15px 30px rgba(0,210,255,0.08)"
                            : "0 15px 30px rgba(0,0,0,0.05)",
                        },
                        "& img": {
                          transition:
                            "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        },
                        "&:hover img": {
                          transform: "scale(1.08)",
                        },
                      }}
                    >
                      <img
                        src={related.image}
                        alt={related.title}
                        style={{
                          width: "70%",
                          height: 150,
                          objectFit: "contain",
                          marginBottom: 16,
                        }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {related.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 800, color: "#00d2ff" }}
                      >
                        ${related.price}
                      </Typography>
                    </Paper>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        )}
      </Container>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={() => setShowSnackbar(false)}
          >
            <Close fontSize="small" />
          </IconButton>
        }
        sx={{
          "& .MuiSnackbar-root": {
            bottom: 30,
          },
        }}
      />
    </Box>
  );
};

export default ProductDetails;
