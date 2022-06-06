import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import React from "react";
import { IMAGE_PLACEHOLDER } from "../../../../../infra";

const ServiceCard = ({
  isSelected = false,
  title = "Corte de cabelo e unha",
  duration = "20min",
  price = "R$ 20,00",
  imageUrl,
  onPress = () => {},
}) => {
  return (
    <Card
      sx={{
        height: 120,
        marginX: "32px",
      }}
    >
      <CardActionArea
        onClick={onPress}
        sx={{
          height: 120,
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
              <Checkbox checked={isSelected} />
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
      </CardActionArea>
    </Card>
  );
};

export const ServicesOfferedStep = ({
  services = [],
  toggleService = () => {},
}) => (
  <Box
    sx={{
      gap: "12px",
      display: "flex",
      flexDirection: "column",
      marginTop: "48px",
    }}
  >
    {services.map((service) => (
      <ServiceCard {...service} onPress={() => toggleService(service.key)} />
    ))}
  </Box>
);
