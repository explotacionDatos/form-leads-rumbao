import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const cards = [
    {
      title: "Taller BDC",
      subtitle: "Formulario",
      text: "Cargar formulario para taller Usuario BDC.",
      path: "/bdc",
    },
    {
      title: "Taller POSTVENTA",
      subtitle: "Formulario",
      text: "Cargar formulario para taller POSTVENTA.",
      path: "/postventa",
    },
  ];
  const navigate = useNavigate();
  const handlerClick = (path) => {
    navigate(path);
  };
  return (
    <div className="main">
      {cards.map((card) => (
        <Card className="card">
          <Card.Body className="card_body">
            <Card.Title>{card.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {card.subtitle}
            </Card.Subtitle>
            <Card.Text>{card.text}</Card.Text>
            <Button variant="primary" onClick={() => handlerClick(card.path)}>
              Ingresar
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Home;
