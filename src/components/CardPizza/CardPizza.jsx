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
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-center">{name}</Card.Title>
        <p className="text-center mb-0">Ingredientes:</p>
        <p className="text-center text-muted small">
          {ingredients.join(', ')}
        </p>
        <p className="text-center fw-bold fs-5 mt-auto">
          Precio: ${price?.toLocaleString()}
        </p>
        <div className="d-flex justify-content-between mt-2">
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