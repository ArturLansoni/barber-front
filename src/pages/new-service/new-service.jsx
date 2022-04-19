import React, { useContext } from "react";
import { Button, Input } from "../../components";
import { NewServiceContext, NewServiceProvider } from "./new-service-context";
import "./new-service-styles.css";
import {TextField} from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ImageIcon from '@mui/icons-material/Image';

const NewServicePage = () => {
  const { state, handleChange, onSubmit, goBack } = useContext(NewServiceContext);

  return (
    <div className="new-service-page-container">
      <form className="new-service-form-container" onSubmit={onSubmit}>
        <h1>Criar Serviço</h1>
        <TextField
          id="description"
          label="Descrição"
          variant="outlined"
          value={state.description}
          onChange={handleChange}
          InputProps={{startAdornment: <DescriptionIcon/>}}
        />

        <TextField
          id="price"
          type="number"
          label="Preço"
          variant="outlined"
          value={state.price}
          onChange={handleChange}
          InputProps={{startAdornment: <AttachMoneyIcon/>}}
        />

        <TextField
          id="estimatedTime"
          type="number"
          label="Tempo estimado"
          variant="outlined"
          value={state.estimatedTime}
          onChange={handleChange}
          InputProps={{startAdornment: <ScheduleIcon/>}}
        />

        <TextField
          id="image"
          label="Imagem"
          variant="outlined"
          value={state.image}
          onChange={handleChange}
          InputProps={{startAdornment: <ImageIcon/>}}
        />


        <Button type="submit" isLoading={state.isLoading}>
          Criar
        </Button>
        <Button variant="outline" onClick={goBack}>
          Voltar
        </Button>
      </form>
    </div>
  );
};

const Page = () => (
  <NewServiceProvider>
    <NewServicePage />
  </NewServiceProvider>
);

export default Page;
