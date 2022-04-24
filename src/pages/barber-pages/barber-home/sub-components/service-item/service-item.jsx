import React from "react";
import { Button, Spinner } from "../../../../../components";

const ServiceItem = ({
  isLoading = false,
  price = "",
  description = "",
  image = "",
  estimatedTime = "",
  onDelete = () => {},
}) => (
  <li>
    {image ? (
      <img className="image-container" src={image} alt={description} />
    ) : (
      <div className="image-container" />
    )}
    <div className="service-item-content">
      <div>
        <h3>{description}</h3>
        <h4>{estimatedTime} min</h4>
      </div>
      <div className="right-container">
        <p>R$ {price}</p>
        <Button variant="danger" size="sm" onClick={onDelete} type="button">
          {isLoading && <Spinner animation="border" role="status" size="sm" />}
          REMOVER
        </Button>
      </div>
    </div>
  </li>
);

export default ServiceItem;
