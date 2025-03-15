// src/pages/Pizza.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { PizzaContext } from '../context/PizzaContext';

const Pizza = () => {
  const { id } = useParams(); //para obtener el ID de la URL
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);
  const { getPizzaById } = useContext(PizzaContext);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        const data = await getPizzaById(id); //ID para obtener datos
        setPizza(data);
      } catch (err) {
        setError('Error al cargar la pizza');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id, getPizzaById]);

  if (loading) {
    return <div className="text-center mt-5">Cargando pizza...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  if (!pizza) {
    return <div className="text-center mt-5">No se encontró la pizza</div>;
  }

  return (
    <div className="container mt-5">
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
              <h2 className="card-title">{pizza.name}</h2>
              <p className="card-text">{pizza.desc}</p>

              <h5 className="mt-3">Ingredientes:</h5>
              <ul className="list-unstyled">
                {pizza.ingredients?.map((ingredient, index) => (
                  <li key={`ingredient-${index}`}>🍕 {ingredient}</li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="text-success mb-0">Precio: ${pizza.price?.toLocaleString()}</h4>
                <button 
                  className="btn btn-danger"
                  onClick={() => addToCart(pizza)}
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pizza;