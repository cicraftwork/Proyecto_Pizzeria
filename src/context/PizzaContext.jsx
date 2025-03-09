import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todas las pizzas
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/pizzas');
        if (!response.ok) {
          throw new Error('Error al cargar las pizzas');
        }
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  // Obtener pizza por ID
  const getPizzaById = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (!response.ok) {
        throw new Error('Error al cargar la pizza');
      }
      return await response.json();
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <PizzaContext.Provider value={{
      pizzas,
      loading,
      error,
      getPizzaById
    }}>
      {children}
    </PizzaContext.Provider>
  );
};

PizzaProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default PizzaProvider;