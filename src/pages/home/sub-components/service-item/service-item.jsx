import React from "react";
import { Button, Spinner } from "../../../../components";
import ScheduleIcon from '@mui/icons-material/Schedule';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ClearIcon from '@mui/icons-material/Clear';

const ServiceItem = ({
  isLoading = false,
  price = "",
  description = "",
  image = "",
  estimatedTime = "",
  onDelete = () => { },
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
        <h4>
          <ScheduleIcon fontSize="small"/>
          {estimatedTime} min
        </h4>
      </div>
      <div className="right-container">
        <p>R${price.toFixed(2).replace(".", ",")}</p>
        <div className="button-container">
          <Button color="secondary" onClick={onDelete} type="button">
            {isLoading && <Spinner animation="border" role="status" size="sm" />}
            <EditOutlinedIcon/>
          </Button>
          <Button color="error" onClick={onDelete} type="button">
            {isLoading && <Spinner animation="border" role="status" size="sm" />}
            <ClearIcon/>
          </Button>
        </div>
      </div>
    </div>
  </li>
);

export default ServiceItem;
