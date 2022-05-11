import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { BarberHomeProvider } from "./barber-home-context";
import "./barber-home-styles.css";

const ServiceItem = ({ title, description, imageUrl, onPress = () => {} }) => {
  return (
    <Card
      onClick={onPress}
      sx={{ height: 120, margin: 5, display: "flex", flexDirection: "row" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ height: 120, width: 120 }}
        image={imageUrl}
        alt={title}
      />
    </Card>
  );
};

const BarberHomePage = () => {
  return (
    <div className="home-page-container">
      <ServiceItem
        title="Barbearia um"
        description="Teste de descricao, texto para testes, texto para testes, texto para testes, texto para testes, texto para testes"
        imageUrl="https://blog.mensmarket.com.br/wp-content/uploads/2018/01/barbearia-barber-shop.jpg"
      />
      <Card className="bottom-container">
        <Typography variant="body2" color="text.secondary">
          teste
        </Typography>
      </Card>
    </div>
  );
};

const Page = () => (
  <BarberHomeProvider>
    <BarberHomePage />
  </BarberHomeProvider>
);

export default Page;
