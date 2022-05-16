import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import React from "react";
import { Button, Image } from "../../../components";
import { IMAGE_PLACEHOLDER } from "../../../infra";
import { ClientServiceProvider } from "./client-services-context";

const ServiceCard = ({
  isChecked = false,
  title = "Corte de cabelo e unha",
  duration = "20min",
  price = "R$ 20,00",
  imageUrl,
  onPress = () => {},
}) => {
  return (
    <Card
      onClick={onPress}
      sx={{
        height: 120,
        marginX: "32px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>
            <Checkbox checked={isChecked} />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="medium">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {duration}
            </Typography>
            <Typography variant="h5">{price}</Typography>
          </Box>
        </Box>
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

const BottomNav = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        padding: "18px 32px",
        bottom: 0,
        borderRadius: "10px 10px 0 0",
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      <Button variant="text" color="secondary" sx={{ textTransform: "none" }}>
        Descartar
      </Button>
      <Button color="secondary">Continuar</Button>
    </Box>
  );
};

const ClientServicesPage = () => {
  return (
    <div className="client-home-page-container">
      <Image
        src=""
        alt="Barber cover"
        style={{
          width: "100%",
          height: "20%",
          maxHeight: 180,
          marginTop: -20,
          "object-fit": "cover",
        }}
      />
      <Image
        src="https://galeriaalmadarua.com.br/wp-content/uploads/2019/04/travel-landscape-01.jpg"
        alt="Barber logo"
        style={{
          height: 120,
          width: 120,
          marginLeft: 32,
          marginTop: -64,
          borderRadius: 12,
        }}
      />
      <Typography variant="h6" style={{ marginLeft: 180, marginTop: -46 }}>
        Barbearia Garagem
      </Typography>
      <Box
        sx={{
          gap: "12px",
          display: "flex",
          flexDirection: "column",
          marginTop: "48px",
        }}
      >
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Box>
      <BottomNav />
    </div>
  );
};

const Page = () => (
  <ClientServiceProvider>
    <ClientServicesPage />
  </ClientServiceProvider>
);

export default Page;
