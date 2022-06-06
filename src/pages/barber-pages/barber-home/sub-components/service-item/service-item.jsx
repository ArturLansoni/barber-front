import React from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Image } from "../../../../../components";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { IMAGE_PLACEHOLDER } from "../../../../../infra";

const ServiceItem = ({
  isLoading = false,
  price = "",
  description = "",
  image = "",
  estimatedTime = "",
  onEdit = () => {},
  onDelete = () => {},
}) => (
  <Card
    sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 3,
    }}
  >
    <CardContent sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "12px",
          marginRight: 1,
        }}
      >
        <Button
          color="secondary"
          sx={{
            maxWidth: "35px",
            minWidth: "35px",
            maxHeight: "35px",
            minHeight: "35px",
          }}
          isLoading={isLoading}
          onClick={onEdit}
        >
          <EditOutlinedIcon />
        </Button>
        <Button
          color="error"
          sx={{
            maxWidth: "35px",
            minWidth: "35px",
            maxHeight: "35px",
            minHeight: "35px",
          }}
          isLoading={isLoading}
          onClick={onDelete}
        >
          <ClearIcon />
        </Button>
      </Box>
      <Box>
        <Typography variant="h6">{description}</Typography>
        <Typography variant="body2" color="text.secondary">
          {estimatedTime} min
        </Typography>
        <Typography variant="body2" color="text.secondary">
          R${price?.toFixed(2).replace(".", ",")}
        </Typography>
      </Box>
    </CardContent>
    <Image
      style={{
        width: "100%",
        maxWidth: 120,
      }}
      src={image || IMAGE_PLACEHOLDER}
      alt={description}
    />
  </Card>
);

export default ServiceItem;
