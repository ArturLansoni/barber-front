import React from "react";
import { Button as MUIButton } from "@mui/material";
import { Spinner } from "..";

export function Button({ children, color, isLoading, ...props }) {
  return (
    <MUIButton
      color={color}
      variant="contained"
      {...props}
      onClick={isLoading ? null : props.onClick}
    >
      {isLoading && <Spinner />}
      {!isLoading && children}
    </MUIButton>
  );
}
