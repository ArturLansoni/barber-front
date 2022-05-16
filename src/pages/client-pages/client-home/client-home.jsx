import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IMAGE_PLACEHOLDER } from "../../../infra";
import { ClientHomeProvider, useClientHome } from "./client-home-context";
import "./client-home-styles.css";

const BarberCard = ({ title, description, imageUrl, onPress = () => {} }) => {
  return (
    <Card
      onClick={onPress}
      sx={{
        height: 120,
        margin: 5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        sx={{ height: 120, width: 120, maxWidth: 120 }}
        image={imageUrl || IMAGE_PLACEHOLDER}
        alt={title}
      />
    </Card>
  );
};

const ClientHomePage = () => {
  const history = useHistory();
  const { findBarbers, services } = useClientHome();
  useEffect(() => {
    findBarbers();
  }, [findBarbers]);

  const onPress = (barberId) => {
    history.push(`/client/services/${barberId}`);
  };

  return (
    <div className="client-home-page-container">
      {services.map((item) => (
        <BarberCard
          key={item._id}
          title={item.name}
          description={item.address?.neighborhood}
          imageUrl={item.image}
          onPress={() => onPress(item._id)}
        />
      ))}
    </div>
  );
};

const Page = () => (
  <ClientHomeProvider>
    <ClientHomePage />
  </ClientHomeProvider>
);

export default Page;
