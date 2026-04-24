import React, { useContext } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  IconButton,
  Grid,
  Link,
} from "@mui/material";
import {
  Diamond,
  Email,
  LocationOn,
  Phone,
  GitHub,
  LinkedIn,
  Language,
  Favorite,
} from "@mui/icons-material";
import { AppSettingsContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const { state } = useContext(AppSettingsContext);
  const navigate = useNavigate();
  const isDark = state.mode === "dark";

  return (
    <Box
      sx={{
        bgcolor: isDark ? "#02060d" : "#f8fafc",
        color: isDark ? "#e6f1ff" : "#050a18",
        pt: 8,
        pb: 3,
        mt: 8,
        borderTop: `1px solid ${
          isDark ? "rgba(0, 210, 255, 0.08)" : "rgba(0, 0, 0, 0.05)"
        }`,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Background */}
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -100,
          width: 400,
          height: 400,
          background: isDark
            ? "radial-gradient(circle, rgba(0, 210, 255, 0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 210, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: -50,
          left: -100,
          width: 300,
          height: 300,
          background: isDark
            ? "radial-gradient(circle, rgba(108, 99, 255, 0.04) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(108, 99, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box
              onClick={() => navigate("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 2,
                cursor: "pointer",
                "&:hover .footer-logo": {
                  filter: "drop-shadow(0 0 10px #00d2ff)",
                },
              }}
            >
              <Diamond
                className="footer-logo"
                sx={{
                  color: "#00d2ff",
                  fontSize: 28,
                  transition: "filter 0.3s ease",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, letterSpacing: "-1px" }}
              >
                LUX<span style={{ color: "#00d2ff" }}>STORE</span>
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                lineHeight: 1.8,
                mb: 3,
                fontSize: "0.85rem",
              }}
            >
              The ultimate destination for premium tech and fashion. We provide
              a curated selection of world-class products for the modern
              lifestyle.
            </Typography>
            <Stack direction="row" spacing={0.5}>
              {[
                { icon: <GitHub />, url: "https://github.com/setayeshazizi" },
                {
                  icon: <LinkedIn />,
                  url: "https://www.linkedin.com/in/setayesh-azizi-b51024358/",
                },
                { icon: <Language />, url: "https://luxstore.com" },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    "&:hover": {
                      color: "#00d2ff",
                      bgcolor: isDark
                        ? "rgba(0, 210, 255, 0.1)"
                        : "rgba(0, 210, 255, 0.08)",
                      transform: "translateY(-4px) scale(1.1)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: isDark ? "#e6f1ff" : "#050a18",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.2}>
              {[
                { label: "Home", path: "/" },
                { label: "Cart", path: "/cart" },
                { label: "Checkout", path: "/checkout" },
                { label: "Details", path: "/product/1" },
              ].map((link) => (
                <Box
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#00d2ff",
                      pl: 1,
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={6} md={2}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: isDark ? "#e6f1ff" : "#050a18",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Support
            </Typography>
            <Stack spacing={1.2}>
              {["Contact", "Shipping", "Returns", "FAQ"].map((item) => (
                <Box
                  key={item}
                  sx={{
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#00d2ff",
                      pl: 1,
                    },
                  }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                mb: 3,
                color: isDark ? "#e6f1ff" : "#050a18",
                fontSize: "0.8rem",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Contact Info
            </Typography>
            <Stack spacing={2}>
              {[
                { icon: <Email />, text: "support@luxstore.com" },
                { icon: <LocationOn />, text: "CTI Academy, Tech District" },
                { icon: <Phone />, text: "+1 (555) 123-4567" },
              ].map((contact, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1,
                    borderRadius: "10px",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: isDark
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(0,0,0,0.02)",
                      transform: "translateX(5px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: "#00d2ff",
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {contact.icon}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(0,0,0,0.6)",
                      fontSize: "0.85rem",
                    }}
                  >
                    {contact.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            transition: "border-color 0.3s ease",
          }}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              fontSize: "0.75rem",
            }}
          >
            © {new Date().getFullYear()} LUX STORE. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.75rem",
            }}
          >
            Made with love for the Future of Web
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
