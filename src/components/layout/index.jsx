import React from "react";
import { Box } from "@mui/material";
import { Header } from "../";

export function Layout({ children }) {
  return (
    <Box sx={{ backgroundColor: "#f4f4f4", height: "100vh", width: "100vw" }}>
      <Header />
      <Box sx={{ height: "100%", width: "100%" }}>{children}</Box>
    </Box>
  );
}
