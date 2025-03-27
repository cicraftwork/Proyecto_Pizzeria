// src/pages/Pizza.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { PizzaContext } from '../context/PizzaContext';
import { Button, Spinner, Alert } from 'react-bootstrap';

const Pizza = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addToCart } = useContext(CartContext);
  const { getPizzaById } = useContext(PizzaContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const data = await getPizzaById(id);
        
        if (!data) {
          throw new Error('Pizza no encontrada');
        }
        
        setPizza(data);
      } catch (err) {
        setError(err.message || 'Error al cargar la pizza');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id, getPizzaById]);

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza);
      setAddedToCart(true);
      
      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Cargando pizza...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={handleGoBack}>
            Volver al inicio
          </Button>
        </Alert>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="container mt-5">
        <Alert variant="warning">
          <Alert.Heading>Pizza no encontrada</Alert.Heading>
          <p>No se encontró la pizza solicitada.</p>
          <Button variant="outline-primary" onClick={handleGoBack}>
            Volver al inicio
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      {addedToCart && (
        <Alert variant="success" className="mb-3">
          ¡{pizza.name} ha sido añadida al carrito!
        </Alert>
      )}
      
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={pizza.img}
              className="img-fluid rounded-start"
              alt={pizza.name}
              style={{height: '100%', objectFit: 'cover'}}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h2 className="card-title">{pizza.name}</h2>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleGoBack}
                >
                  Volver
                </Button>
              </div>
              <p className="card-text">{pizza.desc}</p>

              <h5 className="mt-3">Ingredientes:</h5>
              <ul className="list-unstyled">
                {pizza.ingredients?.map((ingredient, index) => (
                  <li key={`ingredient-${index}`}>🍕 {ingredient}</li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="text-success mb-0">Precio: ${pizza.price?.toLocaleString()}</h4>
                <Button 
                  variant="danger"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;