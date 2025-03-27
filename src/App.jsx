import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

// Componentes
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Páginas
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import Pizza from './pages/Pizza';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Contextos
import { CartProvider } from './context/CartContext';
import { PizzaProvider } from './context/PizzaContext';
import { UserContext, UserProvider } from './context/UserContext';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente para rutas solo accesibles sin autenticación
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);
  return !isAuthenticated ? children : <Navigate to="/" />;
};

// PropTypes para los componentes de rutas
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

PublicOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    <PizzaProvider>
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicOnlyRoute>
                  <RegisterPage />
                </PublicOnlyRoute>
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
    </PizzaProvider>
  );
}

export default App;