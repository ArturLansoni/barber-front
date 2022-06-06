import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CardItem, Spinner } from "../../../components";
import { ClientHomeProvider, useClientHome } from "./client-home-context";
import "./client-home-styles.css";

const ClientHomePage = () => {
  const history = useHistory();
  const { findBarbers, services, isLoading } = useClientHome();
  useEffect(() => {
    findBarbers();
  }, [findBarbers]);

  const onPress = (barberId) => {
    history.push(`/client/offers/${barberId}`);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "48px",
          paddingLeft: "32px",
        }}
      >
        <Typography variant="h4">Barbearias</Typography>
      </Box>
      {services.map((item) => (
        <CardItem
          key={item._id}
          title={item.name}
          description={item.address?.neighborhood}
          imageUrl={item.image}
          onPress={() => onPress(item._id)}
        />
      ))}
      {isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          <Spinner /> Buscando barbearias...
        </Typography>
      )}
      {services.length === 0 && !isLoading && (
        <Typography textAlign="center" sx={{ paddingTop: 4 }}>
          Nenhuma barbearia foi encontrado
        </Typography>
      )}
    </Box>
  );
};

const Page = () => (
  <ClientHomeProvider>
    <ClientHomePage />
  </ClientHomeProvider>
);

export default Page;
