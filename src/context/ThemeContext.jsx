import React, { createContext, useReducer, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const AppSettingsContext = createContext();

const initialState = {
  mode: "dark",
  viewType: "grid",
  selectedCat: "all",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_MODE":
      return { ...state, mode: state.mode === "light" ? "dark" : "light" };
    case "TOGGLE_VIEW":
      return {
        ...state,
        viewType: state.viewType === "grid" ? "list" : "grid",
      };
    case "SET_CATEGORY":
      return { ...state, selectedCat: action.payload };
    default:
      return state;
  }
};

export const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: state.mode,
          primary: { main: "#ADD8E6" },
          background: {
            default: state.mode === "dark" ? "#050a18" : "#f8fafc",
            paper:
              state.mode === "dark"
                ? "rgba(10, 25, 47, 0.8)"
                : "rgba(255, 255, 255, 0.9)",
          },
          text: {
            primary: state.mode === "dark" ? "#e6f1ff" : "#020c1b",
          },
        },
        shape: { borderRadius: 16 },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backdropFilter: "blur(12px)",
                border:
                  state.mode === "dark"
                    ? "1px solid rgba(100, 255, 218, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                boxShadow: "none",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontWeight: 700,
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [state.mode]
  );

  return (
    <AppSettingsContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppSettingsContext.Provider>
  );
};
