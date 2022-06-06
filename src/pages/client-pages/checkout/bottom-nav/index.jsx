import React from "react";
import { Box } from "@mui/system";
import { Button } from "../../../../components";

export const BottomNav = ({
  disableBackButton = false,
  onGoBack = () => {},
  onGoNext = () => {},
  backButtonText = "",
  isLoading,
}) => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        padding: "18px 32px",
        height: "80px",
        bottom: 0,
        borderRadius: "10px 10px 0 0",
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {!disableBackButton ? (
        <Button
          onClick={onGoBack}
          variant="text"
          color="secondary"
          sx={{ textTransform: "none" }}
        >
          {backButtonText}
        </Button>
      ) : (
        <Box />
      )}
      <Button onClick={onGoNext} color="secondary" isLoading={isLoading}>
        Continuar
      </Button>
    </Box>
  );
};
