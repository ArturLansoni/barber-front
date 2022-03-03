import React from "react";
import { Image, Button, Form, Spinner } from "react-bootstrap";

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
      <Image className="image-container" src={image} alt={description} />
    ) : (
      <div className="image-container" />
    )}
    <div className="new-service-item-content">
      <div className="row">
        <div>
          <Form.Group>
            <Form.Control
              id="image"
              size="sm"
              placeholder="Imagem"
              type="url"
              value={image}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              id="description"
              size="sm"
              placeholder="Descrição"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group>
            <Form.Control
              id="estimatedTime"
              size="sm"
              type="number"
              placeholder="Tempo estimado"
              value={estimatedTime}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              id="price"
              size="sm"
              type="number"
              placeholder="Preço"
              value={price}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="right-container">
        <Button variant="success" onClick={onSave} type="button">
          {isLoading && <Spinner animation="border" role="status" size="sm" />}
          SALVAR
        </Button>
      </div>
    </div>
  </li>
);

export default NewServiceItem;
