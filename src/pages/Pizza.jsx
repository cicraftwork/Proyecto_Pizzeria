import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';

const Pizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true);
        // Usando directamente la URL para obtener la pizza con el ID específico
        const response = await fetch(`http://localhost:5000/api/pizzas/${id || 'p001'}`);

        if (!response.ok) {
          throw new Error('No se pudo cargar la pizza');
        }

        const data = await response.json();
        setPizza(data);
      } catch (err) {
        setError('Error al cargar la pizza');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPizza();
  }, [id]);

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
                {pizza.ingredients && pizza.ingredients.map((ingredient, index) => (
                  <li key={`ingredient-${index}`}>🍕 {ingredient}</li>
                ))}
              </ul>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="text-success mb-0">Precio: ${pizza.price}</h4>
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