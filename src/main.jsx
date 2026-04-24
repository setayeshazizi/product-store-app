import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./features/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./context/ThemeContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeContextProvider>
          <Router>
            <App />
          </Router>
        </ThemeContextProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
