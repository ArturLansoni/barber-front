import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { IMAGE_PLACEHOLDER } from "../../infra";
import { Image } from "../image";

export function CardItem({ title, description, imageUrl, onPress = () => {} }) {
  return (
    <Card sx={{ marginX: 5 }}>
      <CardActionArea
        onClick={onPress}
        sx={{
          height: "100%",
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
        <Image
          style={{
            height: "100%",
            width: "100%",
            maxWidth: 120,
            objectFit: "cover",
          }}
          src={imageUrl || IMAGE_PLACEHOLDER}
          alt={title}
        />
      </CardActionArea>
    </Card>
  );
}
