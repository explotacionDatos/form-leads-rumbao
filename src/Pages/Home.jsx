import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const cards = [
    {
      title: "BDC",
      path: "/bdc",
    },
    {
      title: "POSVENTA",
      path: "/posventa",
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
          <Card.Body className="card__body">
            <Card.Title>{card.title}</Card.Title>
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
