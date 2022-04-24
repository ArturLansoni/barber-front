import React from "react";
import { FormGroup } from "@mui/material";
import { Button, Input } from "../../../../../components";

const NewServiceItem = ({
  isLoading = false,
  price = "",
  description = "",
  image = "",
  estimatedTime = "",
  handleChange = () => {},
  onSave = () => {},
}) => (
  <li>
    {image ? (
      <img className="image-container" src={image} alt={description} />
    ) : (
      <div className="image-container" />
    )}
    <div className="new-service-item-content">
      <div className="row">
        <div>
          <FormGroup>
            <Input
              id="image"
              label="Imagem"
              type="url"
              value={image}
              onChange={handleChange}
            />
            <Input
              id="description"
              label="Descrição"
              value={description}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup>
            <Input
              id="estimatedTime"
              type="number"
              label="Tempo estimado"
              value={estimatedTime}
              onChange={handleChange}
            />
            <Input
              id="price"
              type="number"
              label="Preço"
              value={price}
              onChange={handleChange}
            />
          </FormGroup>
        </div>
      </div>
      <div className="right-container">
        <Button color="success" onClick={onSave} isLoading={isLoading}>
          SALVAR
        </Button>
      </div>
    </div>
  </li>
);

export default NewServiceItem;
