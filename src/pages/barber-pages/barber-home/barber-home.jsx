import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Button, DialogConfirmation, Spinner } from "../../../components";
import { ServiceItem } from "./sub-components";
import { BarberHomeProvider, useBarberHome } from "./barber-home-context";
import "./barber-home-styles.css";

const BarberHomePage = () => {
  const {
    state,
    findServices,
    onOpenDeleteConfirmDialog,
    onCloseDialog,
    onDelete,
    onCreateService,
    onEditService,
  } = useBarberHome();

  useEffect(() => {
    findServices();
  }, [findServices]);

  return (
    <Box sx={{ height: "100%", marginX: "32px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "48px",
        }}
      >
        <Typography variant="h4">Serviços</Typography>
        <Button color="secondary" onClick={onCreateService}>
          Novo Serviço
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
      </Box>
      <DialogConfirmation
        isOpen={state.dialog.open}
        onClose={onCloseDialog}
        onSubmit={() => onDelete(state.dialog.id)}
        type="ERROR"
        submitText="Remover"
        title="Remover serviço"
        description={`Você tem certeza que deseja excluir ${state.dialog.description}?`}
      />
      {state.isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          <Spinner /> Buscando serviços...
        </Typography>
      )}
      {state.services.length === 0 && !state.isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          Nenhum serviço foi encontrado
        </Typography>
      )}
    </Box>
  );
};

const Page = () => (
  <BarberHomeProvider>
    <BarberHomePage />
  </BarberHomeProvider>
);

export default Page;
