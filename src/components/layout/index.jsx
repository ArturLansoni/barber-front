import React from "react";
import { Box } from "@mui/material";
import { Header } from "../";

export function Layout({ children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "scroll",
        overflowX: "hidden",
        maxWidth: "100%",
      }}
    >
      <Header />
      <Box
        sx={{ height: "calc(100vh - 80px)", width: "100%", marginTop: "100px" }}
      >
        {children}
      </Box>
    </Box>
  );
}
