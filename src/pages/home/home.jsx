import React, { useEffect, useState } from "react";
import {
  findCurrentBarberServices,
  createService,
  deleteService,
} from "../../services/api";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Spinner } from "../../components";
import { clearLocalStorage } from "../../infra/local-storage/local-storage";
import { ServiceItem, NewServiceItem } from "./sub-components";
import "./home-styles.css";

const HomePage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    price: "",
    description: "",
    image: "",
    estimatedTime: "",
  });

  useEffect(() => {
    findServices();
  }, []);

  const findServices = async () => {
    setIsLoading(true);
    const services = await findCurrentBarberServices();
    setServices(
      services || [
        {
          price: "100",
          description: "Apenas um teste",
          image: "https://github.com/ArturLansoni.png",
          estimatedTime: "100",
        },
      ]
    );
    setIsLoading(false);
  };

  const handleNewServiceChange = (e) => {
    setNewService((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const onLogOut = () => {
    clearLocalStorage();
    history.push("/login");
  };

  const onDelete = async (serviceId) => {
    setIsLoading(true);
    await deleteService(serviceId);
    await findServices();
    setIsLoading(false);
  };

  const onSave = async () => {
    setIsLoading(true);

    if (
      !newService.price ||
      !newService.description ||
      !newService.image ||
      !newService.estimatedTime
    ) {
      setIsLoading(false);
      return;
    }

    await createService(newService);
    setNewService({
      price: "",
      description: "",
      image: "",
      estimatedTime: "",
    });

    toast.success("Serviço cadastrado com sucesso!");
    await findServices();
    setIsLoading(false);
  };

  return (
    <div className="home-page-container">
      <header>
        <h1>✂ Lista de serviços</h1>
        <Button color="error" onClick={onLogOut}>
          LOGOUT
        </Button>
      </header>

      <ul>
        <NewServiceItem
          isLoading={isLoading}
          price={newService.price}
          description={newService.description}
          image={newService.image}
          estimatedTime={newService.estimatedTime}
          handleChange={handleNewServiceChange}
          onSave={onSave}
        />
        {!services.length && isLoading && <Spinner />}
        {services.map((i) => (
          <ServiceItem
            isLoading={isLoading}
            key={i._id}
            price={i.price}
            description={i.description}
            image={i.image}
            estimatedTime={i.estimatedTime}
            onDelete={() => onDelete(i._id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
