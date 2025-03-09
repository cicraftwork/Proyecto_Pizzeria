import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../../context/CartContext';

const CardPizza = ({ pizza }) => {
  // Acceso al contexto del carrito
  const { addToCart } = useContext(CartContext);

  // propiedades de la pizza
  const { id, name, ingredients, price, img } = pizza;

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
          <Button
            as={Link}
            to={`/pizza/${id}`}
            variant="primary"
            size="sm"
          >
            Ver más
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => addToCart(pizza)}
          >
            Añadir
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

CardPizza.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    img: PropTypes.string.isRequired
  }).isRequired
};

export default CardPizza;