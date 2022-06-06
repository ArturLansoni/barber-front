import React from "react";
import { Box } from "@mui/material";
import { Header, BottomNav } from "../";
import { useHistory } from "react-router-dom";

export function Layout({ children }) {
  const history = useHistory();
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
        sx={{
          height: "100vh",
          width: "100%",
          marginTop: "100px",
          paddingBottom: "180px",
        }}
      >
        {children}
      </Box>
      {!history.location.pathname.includes("/client/offers") && <BottomNav />}
    </Box>
  );
}
