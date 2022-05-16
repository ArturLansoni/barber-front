import React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useApp } from "../../context/application-context";
import { Button } from "../button";

export function Header() {
  const { logOut } = useApp();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BarberBook
          </Typography>
          <Button color="error" onClick={logOut}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
