import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Tooltip,
  ButtonGroup,
  Button,
} from "@mui/material";
import {
  ShoppingCart,
  Diamond,
  DarkMode,
  LightMode,
  GridView,
  ViewList,
} from "@mui/icons-material";
import { AppSettingsContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const { state, dispatch } = useContext(AppSettingsContext);
  const { totalQuantity } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(25px)",
        backgroundColor:
          state.mode === "dark"
            ? "rgba(5, 10, 24, 0.75)"
            : "rgba(255, 255, 255, 0.75)",
        backgroundImage: "none",
        borderBottom: `1px solid ${
          state.mode === "dark"
            ? "rgba(0, 210, 255, 0.2)"
            : "rgba(0, 0, 0, 0.08)"
        }`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            "&:hover": {
              "& .logo-text": {
                textShadow:
                  state.mode === "dark"
                    ? "0 0 20px rgba(0, 210, 255, 0.7)"
                    : "0 0 20px rgba(0, 150, 255, 0.3)",
              },
            },
          }}
        >
          <motion.div
            animate={{ rotateY: [0, 180, 360], scale: [1, 1.05, 1] }}
            transition={{
              rotateY: { repeat: Infinity, duration: 4, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
          >
            <Diamond sx={{ fontSize: 36, color: "#00d2ff" }} />
          </motion.div>
          <Typography
            className="logo-text"
            variant="h5"
            sx={{
              fontWeight: 900,
              letterSpacing: "-1px",
              color: state.mode === "dark" ? "#fff" : "#050a18",
              display: { xs: "none", sm: "block" },
              transition: "text-shadow 0.3s ease",
            }}
          >
            LUX<span style={{ color: "#00d2ff", fontWeight: 900 }}>STORE</span>
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ButtonGroup
            variant="outlined"
            size="small"
            sx={{
              mr: 1,
              "& .MuiButton-root": {
                borderColor: "rgba(0, 210, 255, 0.3)",
                color: state.mode === "dark" ? "#e6f1ff" : "#050a18",
                "&:hover": {
                  borderColor: "#00d2ff",
                  backgroundColor: "rgba(0, 210, 255, 0.1)",
                },
              },
            }}
          >
            <Tooltip title="Grid View" arrow>
              <Button
                variant={state.viewType === "grid" ? "contained" : "outlined"}
                onClick={() => dispatch({ type: "TOGGLE_VIEW" })}
                sx={{
                  backgroundColor: state.viewType === "grid" ? "#00d2ff !important" : "transparent",
                  color: state.viewType === "grid" ? "#050a18 !important" : "inherit",
                }}
              >
                <GridView fontSize="small" />
              </Button>
            </Tooltip>
            <Tooltip title="List View" arrow>
              <Button
                variant={state.viewType === "list" ? "contained" : "outlined"}
                onClick={() => dispatch({ type: "TOGGLE_VIEW" })}
                sx={{
                  backgroundColor: state.viewType === "list" ? "#00d2ff !important" : "transparent",
                  color: state.viewType === "list" ? "#050a18 !important" : "inherit",
                }}
              >
                <ViewList fontSize="small" />
              </Button>
            </Tooltip>
          </ButtonGroup>

          <Tooltip title={state.mode === "dark" ? "Light Mode" : "Dark Mode"} arrow>
            <IconButton
              onClick={() => dispatch({ type: "TOGGLE_MODE" })}
              sx={{
                color: "#00d2ff",
                border: "1px solid rgba(0, 210, 255, 0.25)",
                borderRadius: "12px",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 210, 255, 0.1)",
                  transform: "rotate(15deg) scale(1.1)",
                },
              }}
            >
              {state.mode === "dark" ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <motion.div
            animate={totalQuantity > 0 ? { scale: [1, 1.15, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Tooltip title="Shopping Cart" arrow>
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{
                  p: 1.5,
                  borderRadius: "14px",
                  background: totalQuantity > 0
                    ? "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)"
                    : "rgba(0, 210, 255, 0.1)",
                  transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 20px -5px rgba(0, 210, 255, 0.4)",
                  },
                }}
              >
                <Badge
                  badgeContent={totalQuantity}
                  sx={{
                    "& .MuiBadge-badge": {
                      background: state.mode === "dark" ? "#050a18" : "#fff",
                      color: state.mode === "dark" ? "#00d2ff" : "#050a18",
                      fontWeight: 900,
                      fontSize: "0.7rem",
                      border: "2px solid #00d2ff",
                    },
                  }}
                >
                  <ShoppingCart
                    sx={{
                      fontSize: 24,
                      color: totalQuantity > 0
                        ? state.mode === "dark" ? "#050a18" : "#fff"
                        : state.mode === "dark" ? "#e6f1ff" : "#050a18",
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
          </motion.div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;