import React, { useState, useMemo, useContext } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Pagination,
  Stack,
  Chip,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Skeleton,
  Alert,
  AlertTitle,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Search,
  FilterList,
  ShoppingBag,
  Star,
  LocalOffer,
  ArrowForward,
  Diamond,
} from "@mui/icons-material";
import { useProducts } from "../hooks/useProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppSettingsContext } from "../context/ThemeContext";

const Home = () => {
  const { data: products, isLoading, error, refetch } = useProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: settings } = useContext(AppSettingsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const itemsPerPage = 12;
  const isDark = settings.mode === "dark";
  const isListView = settings.viewType === "list";

  // Categories
  const categories = useMemo(() => {
    if (!products) return ["all"];

    const allCats = [...new Set(products.map((p) => p.category))];
    const excludeList = ["home-decoration", "furniture", "groceries"];
    let filtered = allCats.filter((cat) => !excludeList.includes(cat));

    if (filtered.length > 8) {
      filtered = filtered.slice(0, 8);
    }

    return ["all", ...filtered];
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter(
      (p) =>
        (selectedCategory === "all" || p.category === selectedCategory) &&
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Loading State
  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ mx: "auto" }}
          />
          <Skeleton
            variant="text"
            width={500}
            height={30}
            sx={{ mx: "auto", mt: 2 }}
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(6, 1fr)",
            },
            gap: 2.5,
          }}
        >
          {[...Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={300}
              sx={{ borderRadius: "20px" }}
              animation="wave"
            />
          ))}
        </Box>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: "24px",
            p: 4,
            backdropFilter: "blur(10px)",
            bgcolor: isDark
              ? "rgba(211, 47, 47, 0.1)"
              : "rgba(211, 47, 47, 0.05)",
          }}
          action={
            <Button color="inherit" size="large" onClick={() => refetch()}>
              Retry
            </Button>
          }
        >
          <AlertTitle sx={{ fontWeight: 900, fontSize: "1.2rem" }}>
            Connection Error
          </AlertTitle>
          Unable to fetch products. Please check your connection.
        </Alert>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        transition: "background-color 0.3s ease",
      }}
    >
      {/*  HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          pt: { xs: 8, md: 12 },
          pb: { xs: 4, md: 6 },
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 400,
            background: isDark
              ? "radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.06) 0%, transparent 60%)"
              : "radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.04) 0%, transparent 60%)",
            filter: "blur(80px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Icon */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotateY: 360 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Diamond
                  sx={{
                    fontSize: 48,
                    color: "#00d2ff",
                    filter: "drop-shadow(0 0 20px rgba(0, 210, 255, 0.4))",
                  }}
                />
              </motion.div>
            </Box>

            {/* Title */}
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                textAlign: "center",
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                mb: 2,
                background: isDark
                  ? "linear-gradient(135deg, #FFFFFF 0%, #A1A1AA 50%, #00d2ff 100%)"
                  : "linear-gradient(135deg, #09090B 0%, #3F3F46 50%, #0080CC 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: isDark ? "0 0 60px rgba(0, 210, 255, 0.1)" : "none",
              }}
            >
              LUXE Essentials
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                mb: 5,
                opacity: 0.7,
                fontWeight: 400,
              }}
            >
              Explore our curated collection of exceptional products
            </Typography>

            {/* Search Bar*/}
            <Box sx={{ maxWidth: 520, mx: "auto", px: 2 }}>
              <TextField
                fullWidth
                placeholder="Search for products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#00d2ff", fontSize: 22 }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setSearchTerm("")}
                        sx={{ color: "text.secondary" }}
                      >
                        ✕
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    height: 52,
                    borderRadius: "18px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(255,255,255,0.8)",
                    backdropFilter: "blur(12px)",
                    border: `1.5px solid ${
                      isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                    }`,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      border: "1.5px solid rgba(0,210,255,0.3)",
                      bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                    },
                    "&:focus-within": {
                      border: "1.5px solid #00d2ff",
                      boxShadow: isDark
                        ? "0 8px 30px rgba(0,210,255,0.1)"
                        : "0 8px 30px rgba(0,0,0,0.04)",
                    },
                    "& fieldset": { border: "none" },
                    "& input": {
                      fontSize: "0.95rem",
                      "&::placeholder": {
                        fontSize: "0.95rem",
                        opacity: 0.6,
                      },
                    },
                  },
                }}
              />
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/*FILTER BAR*/}
      <Container maxWidth="xl" sx={{ mb: 5 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 1.5, md: 2 },
              borderRadius: "24px",
              bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
              }`,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            {/* Categories */}
            <Box
              sx={{
                flex: 1,
                overflowX: { xs: "visible", md: "auto" },
                overflowY: "hidden",
                "&::-webkit-scrollbar": { height: 0 },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "nowrap" }}>
                  {categories.map((cat) => (
                    <Chip
                      key={cat}
                      label={
                        cat === "all"
                          ? "All"
                          : cat.charAt(0).toUpperCase() + cat.slice(1)
                      }
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPage(1);
                      }}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        borderRadius: "14px",
                        px: 1,
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        bgcolor:
                          selectedCategory === cat ? "#00d2ff" : "transparent",
                        color:
                          selectedCategory === cat ? "#050a18" : "text.primary",
                        border: `1.5px solid ${
                          selectedCategory === cat
                            ? "#00d2ff"
                            : isDark
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.06)"
                        }`,
                        "&:hover": {
                          bgcolor:
                            selectedCategory === cat
                              ? "#00d2ff"
                              : "rgba(0,210,255,0.08)",
                          border: "1.5px solid #00d2ff",
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* موبایل - ۳ ستونه با فونت خیلی کوچیک */}
              <Box
                sx={{
                  display: { xs: "grid", md: "none" },
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 0.8,
                }}
              >
                {categories.map((cat) => (
                  <Chip
                    key={cat}
                    label={
                      cat === "all"
                        ? "All"
                        : cat.charAt(0).toUpperCase() + cat.slice(1)
                    }
                    onClick={() => {
                      setSelectedCategory(cat);
                      setPage(1);
                    }}
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.6rem !important",
                      borderRadius: "10px",
                      px: "4px !important",
                      height: "28px !important",
                      width: "100%",
                      maxWidth: "100%",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "& .MuiChip-label": {
                        px: "4px !important",
                        fontSize: "0.6rem !important",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      },
                      bgcolor:
                        selectedCategory === cat ? "#00d2ff" : "transparent",
                      color:
                        selectedCategory === cat ? "#050a18" : "text.primary",
                      border: `1.5px solid ${
                        selectedCategory === cat
                          ? "#00d2ff"
                          : isDark
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(0,0,0,0.06)"
                      }`,
                      "&:hover": {
                        bgcolor:
                          selectedCategory === cat
                            ? "#00d2ff"
                            : "rgba(0,210,255,0.08)",
                        border: "1.5px solid #00d2ff",
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Sort */}
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                displayEmpty
                startAdornment={
                  <FilterList sx={{ mr: 1, color: "#00d2ff", fontSize: 18 }} />
                }
                sx={{
                  borderRadius: "14px",
                  fontSize: "0.85rem",
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.02)",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&:hover": {
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.04)",
                  },
                }}
              >
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="price-asc">Price: Low → High</MenuItem>
                <MenuItem value="price-desc">Price: High → Low</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </motion.div>
      </Container>

      {/* PRODUCT GRID */}
      <Container maxWidth="xl" sx={{ pb: 8 }}>
        {currentProducts.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 10 }}>
            <LocalOffer
              sx={{ fontSize: 64, color: "#00d2ff", mb: 2, opacity: 0.5 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
              No products found
            </Typography>
            <Typography color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isListView
                ? { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }
                : {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(6, 1fr)",
                  },
              gap: 2.5,
            }}
          >
            <AnimatePresence mode="popLayout">
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                  }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Box
                    sx={{
                      height: "100%",
                      borderRadius: "20px",
                      bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                      backdropFilter: "blur(10px)",
                      border: `1px solid ${
                        isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                      }`,
                      overflow: "hidden",
                      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform:
                        hoveredProduct === product.id
                          ? "translateY(-8px) scale(1.01)"
                          : "none",
                      boxShadow:
                        hoveredProduct === product.id
                          ? isDark
                            ? "0 25px 40px -12px rgba(0,210,255,0.2)"
                            : "0 25px 40px -12px rgba(0,0,0,0.1)"
                          : "none",
                      cursor: "pointer",

                      display: isListView ? "flex" : "block",
                      flexDirection: isListView ? "row" : "column",
                      alignItems: isListView ? "center" : "stretch",
                      gap: isListView ? 3 : 0,
                    }}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {/* Image Container */}
                    <Box
                      sx={{
                        position: "relative",
                        pt: isListView ? "0%" : "100%",
                        width: isListView ? "180px" : "100%",
                        height: isListView ? "180px" : "auto",
                        minWidth: isListView ? "180px" : "auto",
                        bgcolor: isDark ? "#0a0f1a" : "#fafafa",
                        overflow: "hidden",
                        borderRadius: isListView ? "16px" : "0",
                        m: isListView ? 2 : 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                          position: isListView ? "relative" : "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          p: 2,
                          transition:
                            "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                          transform:
                            hoveredProduct === product.id
                              ? "scale(1.08) rotate(2deg)"
                              : "scale(1)",
                        }}
                      />

                      {/* Quick View */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                          opacity: hoveredProduct === product.id ? 1 : 0,
                          y: hoveredProduct === product.id ? 0 : 10,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 12,
                            right: 12,
                            bgcolor: "#00d2ff",
                            borderRadius: "50%",
                            width: 42,
                            height: 42,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ArrowForward
                            sx={{ color: "#050a18", fontSize: 20 }}
                          />
                        </Box>
                      </motion.div>
                    </Box>

                    {/* Content */}
                    <Box
                      sx={{
                        p: 2,
                        flex: 1,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#00d2ff",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.8,
                          fontSize: "0.65rem",
                        }}
                      >
                        {product.category}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          fontSize: isListView ? "1.1rem" : "0.85rem",
                          mt: 0.5,
                          mb: 1,
                          height: isListView ? "auto" : 40,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: isListView ? 3 : 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: 1.4,
                        }}
                      >
                        {product.title}
                      </Typography>

                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 1.5,
                        }}
                      >
                        <Star sx={{ fontSize: 14, color: "#FFB800" }} />
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 600, fontSize: "0.75rem" }}
                        >
                          {product.rating?.rate || 4.5}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontSize: "0.7rem" }}
                        >
                          ({product.rating?.count || 100})
                        </Typography>
                      </Box>

                      {/* Price & Cart */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 800,
                            fontSize: isListView ? "1.3rem" : "1.1rem",
                            color: "#00d2ff",
                          }}
                        >
                          ${product.price}
                        </Typography>

                        <Tooltip title="Add to Cart" arrow>
                          <IconButton
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(addToCart(product));
                            }}
                            sx={{
                              bgcolor: isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.04)",
                              borderRadius: "12px",
                              width: 36,
                              height: 36,
                              transition: "all 0.25s ease",
                              "&:hover": {
                                bgcolor: "#00d2ff",
                                color: "#050a18",
                                transform: "scale(1.15) rotate(-5deg)",
                              },
                            }}
                          >
                            <ShoppingBag sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Stack sx={{ mt: 8, alignItems: "center" }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => {
                  setPage(value);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontWeight: 600,
                    borderRadius: "12px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "rgba(0,210,255,0.1)",
                    },
                  },
                  "& .Mui-selected": {
                    bgcolor: "#00d2ff !important",
                    color: "#050a18 !important",
                    boxShadow: "0 6px 20px rgba(0,210,255,0.3)",
                  },
                }}
              />
            </Stack>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default Home;
