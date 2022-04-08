import React from "react";
import { Button as MUIButton } from "@mui/material";
import { Spinner } from "..";

export function Button({ children, isLoading, ...props }) {
  return (
    <MUIButton variant="contained" {...props}>
      {isLoading && <Spinner />}
      {!isLoading && children}
    </MUIButton>
  );
}
