import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CardPizza = ({ name, price, ingredients, img }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={img}
        alt={name}
        style={{
          height: '200px',
          objectFit: 'cover'
        }}
      />
      <Card.Body className="d-flex flex-column text-center">
        <Card.Title className="fw-bold">{name}</Card.Title>
        <p className="mb-0">Ingredientes:</p>
        <div className="d-flex justify-content-center">
          <ul className="list-unstyled mb-3">
            {ingredients.map(ingredient => (
              <li key={`${name}-${ingredient}`} className="text-muted small">🍕 {ingredient}</li>
            ))}
          </ul>
        </div>
        <p className="fw-bold fs-5 mt-auto">
          Precio: ${price.toLocaleString()}
        </p>
        <div className="d-flex justify-content-center gap-2 mt-2">
          <Button variant="primary" size="sm">Ver más</Button>
          <Button variant="danger" size="sm">Añadir</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

CardPizza.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  img: PropTypes.string.isRequired
};

export default CardPizza;