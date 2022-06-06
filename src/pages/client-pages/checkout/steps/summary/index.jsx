import React from "react";
import { Box, Chip, Typography } from "@mui/material";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const SummaryStep = ({ services = [], day, hour, finalPrice }) => (
  <Box
    sx={{
      marginX: "32px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>Servicos</Typography>
      {services.map((service) => (
        <Chip key={service.key} label={service.title} />
      ))}
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>Dia</Typography>
      <Chip label={day} />
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>Horario</Typography>
      <Chip label={hour} />
    </Box>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Typography>Valor total</Typography>
      <Typography>{formatter.format(finalPrice)}</Typography>
    </Box>
  </Box>
);
