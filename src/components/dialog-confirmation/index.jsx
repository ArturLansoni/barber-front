import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { Button } from "../button";

export function DialogConfirmation({
  isOpen = false,
  title = "",
  description = "",
  type = "CONFIRM",
  submitText,
  onSubmit = () => {},
  onClose = () => {},
}) {
  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle onClose={onClose}>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography>{description}</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          color={type === "CONFIRM" ? "primary" : "error"}
          onClick={onSubmit}
        >
          {submitText
            ? submitText
            : type === "CONFIRM"
            ? "Confirmar"
            : "Recusar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
