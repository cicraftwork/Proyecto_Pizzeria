// src/context/UserContext.jsx
import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Toast from '../components/Toast/Toast';

export const UserContext = createContext(); // Crea el contexto

export const UserProvider = ({ children }) => {
  // Estado para el token JWT
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('jwtToken') || null;
    } catch (error) {
      console.error('Error retrieving token from localStorage:', error);
      return null;
    }
  });

  // Estado para el email del usuario
  const [userEmail, setUserEmail] = useState(() => {
    try {
      return localStorage.getItem('userEmail') || null;
    } catch (error) {
      console.error('Error retrieving email from localStorage:', error);
      return null;
    }
  });

  // Estado para notificaciones
  const [notification, setNotification] = useState(null);
  // Estado para carga
  const [loading, setLoading] = useState(false);

  // Efecto para guardar el token en localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('jwtToken', token);
    } else {
      localStorage.removeItem('jwtToken');
    }
  }, [token]);

  // Efecto para guardar el email en localStorage
  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  // Método para registrar usuario
  const register = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      // Guardar token y email
      setToken(data.token);
      setUserEmail(data.email);
      setNotification({
        message: '¡Usuario registrado con éxito!',
        type: 'success'
      });
      return true;
    } catch (error) {
      setNotification({
        message: error.message,
        type: 'danger'
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Método para iniciar sesión
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Guardar token y email
      setToken(data.token);
      setUserEmail(data.email);
      setNotification({
        message: '¡Sesión iniciada con éxito!',
        type: 'success'
      });
      return true;
    } catch (error) {
      setNotification({
        message: error.message,
        type: 'danger'
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Método para cerrar sesión
  const logout = useCallback(() => {
    setToken(null);
    setUserEmail(null);
    setNotification({
      message: 'Has cerrado sesión',
      type: 'info'
    });
  }, []);

  // Método para obtener perfil del usuario
  const getProfile = useCallback(async () => {
    if (!token) return null;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener perfil');
      }

      setUserEmail(data.email);
      return data;
    } catch (error) {
      setNotification({
        message: error.message,
        type: 'danger'
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Memoizar el valor del contexto
  const contextValue = useMemo(() => {
    return {
      token,
      userEmail,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
      register,
      getProfile
    };
  }, [token, userEmail, loading, login, logout, register, getProfile]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserProvider;