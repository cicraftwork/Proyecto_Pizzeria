// src/context/UserContext.jsx
import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

export const UserContext = createContext(); // Crea el contexto

export const UserProvider = ({ children }) => {
  // Inicializar token desde localStorage si existe, de lo contrario true (como pide el requisito)
  const [token, setToken] = useState(() => {
    try {
      const savedToken = localStorage.getItem('userToken');
      return savedToken ? JSON.parse(savedToken) : true;
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
      return true;
    }
  });

  // Guardar token en localStorage cuando cambie
  useEffect(() => {
    try {
      localStorage.setItem('userToken', JSON.stringify(token));
    } catch (error) {
      console.error('Error saving token to localStorage:', error);
    }
  }, [token]);

  // Función para cerrar sesión
  const logout = () => {
    setToken(false);
  };

  // Función para iniciar sesión
  const login = () => {
    setToken(true);
  };

// Memoizar el valor del contexto para evitar renderizados innecesarios
const contextValue = useMemo(() => {
  return { token, logout, login };
}, [token]); // Solo se recalcula cuando token cambia

return (
  <UserContext.Provider value={contextValue}>
    {children}
  </UserContext.Provider>
);
};

UserProvider.propTypes = {
children: PropTypes.node.isRequired
};

export default UserProvider;