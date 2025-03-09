import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Toast from '../components/Toast/Toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('pizzaCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      return [];
    }
  });

  const [total, setTotal] = useState(0);
  const [notification, setNotification] = useState(null);

  // Calcular total y actualizar
  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
    try {
      localStorage.setItem('pizzaCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Añadir al carrito
  const addToCart = (pizza) => {
    const existingPizza = cart.find(item => item.id === pizza.id);

    if (existingPizza) {
      setCart(cart.map(item =>
        item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      setNotification({
        message: `Se agregó otra ${pizza.name} al carrito`,
        type: 'success'
      });
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
      setNotification({
        message: `${pizza.name} agregada al carrito`,
        type: 'success'
      });
    }
  };

  // Eliminar del carrito
  const removeFromCart = (id) => {
    const pizzaToRemove = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));

    if (pizzaToRemove) {
      setNotification({
        message: `${pizzaToRemove.name} eliminada del carrito`,
        type: 'warning'
      });
    }
  };

  // Incrementar cantidad
  const incrementQuantity = (id) => {
    const pizza = cart.find(item => item.id === id);
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));

    if (pizza) {
      setNotification({
        message: `Se incrementó la cantidad de ${pizza.name}`,
        type: 'info'
      });
    }
  };

  // Disminuir cantidad
  const decrementQuantity = (id) => {
    const pizza = cart.find(item => item.id === id);
    const shouldRemove = pizza && pizza.quantity <= 1;

    if (shouldRemove) {
      setCart(cart.filter(item => item.id !== id));
      setNotification({
        message: `${pizza.name} eliminada del carrito`,
        type: 'warning'
      });
    } else if (pizza) {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      ));
      setNotification({
        message: `Se decrementó la cantidad de ${pizza.name}`,
        type: 'info'
      });
    }
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
    setNotification({
      message: 'Carrito vacío',
      type: 'warning'
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      clearCart
    }}>
      {children}
      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartProvider;