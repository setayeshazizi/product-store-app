import React, { useContext, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Paper,
  IconButton,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Tooltip,
  Zoom,
} from "@mui/material";
import {
  ArrowBack,
  CreditCard,
  CheckCircle,
  LocalShipping,
  Payment,
  Lock,
  Diamond,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppSettingsContext } from "../context/ThemeContext";

const CheckoutPage = () => {
  const { items, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: settings } = useContext(AppSettingsContext);
  const isDark = settings.mode === "dark";

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [finalTotal, setFinalTotal] = useState(null);

  const steps = ["Shipping", "Payment", "Confirmation"];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.address ||
        !formData.city
      ) {
        alert("Please fill in all shipping details.");
        return;
      }
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (!formData.cardNumber || !formData.expiry || !formData.cvv) {
        alert("Please fill in all payment details.");
        return;
      }
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = () => {
    const totalWithTax = (totalPrice * 1.1).toFixed(2);
    setFinalTotal(totalWithTax);
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={0}
            sx={{
              textAlign: "center",
              p: 6,
              borderRadius: "32px",
              bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
              backdropFilter: "blur(20px)",
              border: `1px solid ${
                isDark ? "rgba(76,175,80,0.3)" : "rgba(76,175,80,0.2)"
              }`,
            }}
          >
            <motion.div
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle sx={{ fontSize: 80, color: "#4CAF50", mb: 3 }} />
            </motion.div>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>
              Order Confirmed!
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Thank you for your purchase. You'll receive a confirmation email
              shortly.
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 800, color: "#00d2ff", mb: 4 }}
            >
              ${finalTotal}
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                bgcolor: "#00d2ff",
                color: "#050a18",
                fontWeight: 800,
                borderRadius: "16px",
                px: 6,
                py: 1.5,
                "&:hover": { bgcolor: "#00b8e6" },
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </motion.div>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 6 }}>
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 5 }}>
            <IconButton
              onClick={() => navigate("/cart")}
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
                    background: isDark
                      ? "linear-gradient(135deg, #fff 0%, #a1a1aa 100%)"
                      : "linear-gradient(135deg, #09090b 0%, #52525b 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Checkout
                </Typography>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode="wait">
          {/* Step 0: Shipping */}
          {activeStep === 0 && (
            <motion.div
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <LocalShipping sx={{ color: "#00d2ff" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Shipping Details
                  </Typography>
                </Box>
                <Stack spacing={2.5}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <TextField
                      fullWidth
                      label="Zip Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                  sx={{
                    mt: 4,
                    bgcolor: "#00d2ff",
                    color: "#050a18",
                    fontWeight: 800,
                    borderRadius: "16px",
                    py: 1.5,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#00b8e6" },
                  }}
                >
                  Continue to Payment
                </Button>
              </Paper>
            </motion.div>
          )}

          {/* Step 1: Payment */}
          {activeStep === 1 && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Payment sx={{ color: "#00d2ff" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Payment Details
                  </Typography>
                </Box>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    InputProps={{
                      startAdornment: (
                        <CreditCard sx={{ mr: 1, color: "#00d2ff" }} />
                      ),
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                    />
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      type="password"
                    />
                  </Box>
                </Stack>
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleBack}
                    sx={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                      color: "text.primary",
                      fontWeight: 700,
                      borderRadius: "16px",
                      py: 1.5,
                      textTransform: "none",
                      flex: 1,
                      "&:hover": { borderColor: "#00d2ff" },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    sx={{
                      bgcolor: "#00d2ff",
                      color: "#050a18",
                      fontWeight: 800,
                      borderRadius: "16px",
                      py: 1.5,
                      textTransform: "none",
                      flex: 1,
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "#00b8e6" },
                    }}
                  >
                    Review Order
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}

          {/* Step 2: Confirmation */}
          {activeStep === 2 && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: "24px",
                  bgcolor: isDark ? "rgba(255,255,255,0.02)" : "#fff",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"
                  }`,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    mb: 3,
                  }}
                >
                  <Lock sx={{ color: "#00d2ff" }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Order Confirmation
                  </Typography>
                </Box>

                {/* Shipping Summary */}
                <Paper
                  sx={{
                    p: 2.5,
                    mb: 2,
                    borderRadius: "16px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.01)",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Shipping To:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formData.firstName} {formData.lastName}
                    <br />
                    {formData.address}, {formData.city} {formData.zipCode}
                    <br />
                    {formData.email}
                  </Typography>
                </Paper>

                {/* Payment Summary */}
                <Paper
                  sx={{
                    p: 2.5,
                    mb: 3,
                    borderRadius: "16px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.03)"
                      : "rgba(0,0,0,0.01)",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 1 }}
                  >
                    Payment Method:
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCard sx={{ color: "#00d2ff", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      ** ** **** {formData.cardNumber.slice(-4)}
                    </Typography>
                  </Box>
                </Paper>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    Total
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 900, color: "#00d2ff" }}
                  >
                    ${(totalPrice * 1.1).toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleBack}
                    sx={{
                      borderColor: isDark
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                      color: "text.primary",
                      fontWeight: 700,
                      borderRadius: "16px",
                      py: 1.5,
                      textTransform: "none",
                      flex: 1,
                      "&:hover": { borderColor: "#00d2ff" },
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handlePlaceOrder}
                    startIcon={<CheckCircle />}
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "#fff",
                      fontWeight: 800,
                      borderRadius: "16px",
                      py: 1.5,
                      textTransform: "none",
                      flex: 2,
                      fontSize: "1rem",
                      "&:hover": {
                        bgcolor: "#43A047",
                        transform: "translateY(-2px)",
                        boxShadow: "0 10px 25px rgba(76,175,80,0.3)",
                      },
                    }}
                  >
                    Place Order
                  </Button>
                </Box>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default CheckoutPage;
