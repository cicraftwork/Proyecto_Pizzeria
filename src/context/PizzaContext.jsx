import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
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

  // Obtener pizza por ID usando useCallback para memorizar la función
  const getPizzaById = useCallback(async (id) => {
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
  }, []);

  // Crear valor memorizado para el contexto
  const value = useMemo(() => ({
    pizzas,
    loading,
    error,
    getPizzaById
  }), [pizzas, loading, error, getPizzaById]);

  return (
    <PizzaContext.Provider value={value}>
      {children}
    </PizzaContext.Provider>
  );
};

PizzaProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default PizzaProvider;