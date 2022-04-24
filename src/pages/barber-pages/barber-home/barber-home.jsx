import React, { useContext, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button, Spinner } from "../../../components";
import { ServiceItem } from "./sub-components";
import { BarberHomeContext, BarberHomeProvider } from "./barber-home-context";
import "./barber-home-styles.css";

const BarberHomePage = () => {
  const {
    state,
    findServices,
    onLogOut,
    onOpenDeleteConfirmDialog,
    onCloseDialog,
    onDelete,
    onCreateService,
    onEditService,
  } = useContext(BarberHomeContext);

  useEffect(() => {
    findServices();
  }, []);

  return (
    <div className="home-page-container">
      <header>
        <h1>Barberbook</h1>
        <Button color="error" onClick={onLogOut}>
          LOGOUT
        </Button>
      </header>

      <div className="home-title">
        <h2>Serviços</h2>
        <Button type="button" color="secondary" onClick={onCreateService}>
          + Novo Serviço
        </Button>
      </div>

      <ul>
        {!state.services.length && state.isLoading && <Spinner />}
        {state.services.map((i) => (
          <ServiceItem
            isLoading={state.isLoading}
            key={i._id}
            price={i.price}
            description={i.description}
            image={i.image}
            estimatedTime={i.estimatedTime}
            onEdit={() => onEditService(i)}
            onDelete={() => onOpenDeleteConfirmDialog(i._id, i.description)}
          />
        ))}
      </ul>

      <Dialog
        open={state.dialog.open}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Você tem certeza que deseja excluir ${state.dialog.description}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button
            onClick={() => onDelete(state.dialog.id)}
            autoFocus
            color="secondary"
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const Page = () => (
  <BarberHomeProvider>
    <BarberHomePage />
  </BarberHomeProvider>
);

export default Page;
