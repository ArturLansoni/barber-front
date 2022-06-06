import { Box, Typography } from "@mui/material";
import React from "react";
import { Image } from "../../../../../components";
import illustration from "../../../../../assets/success-illustration.svg";

export const ConfirmationStep = () => (
  <Box
    sx={{
      marginX: "32px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Image
      src={illustration}
      style={{ height: "340px", width: "100%", objectFit: "contain" }}
    />
    <Typography variant="h6" sx={{ textAlign: "center" }}>
      Tudo pronto!
    </Typography>
    <Typography sx={{ textAlign: "center" }}>
      Agora é só aguardar a confirmação do seu barbeiro
    </Typography>
  </Box>
);
