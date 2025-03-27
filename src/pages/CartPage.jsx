// src/pages/CartPage.jsx
import { useContext, useState } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const CartPage = () => {
    // Contextos
    const { cart, total, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { token, isAuthenticated } = useContext(UserContext);
    
    // Estado para el proceso de checkout
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    // Función para realizar el checkout
    const handleCheckout = async () => {
        if (!isAuthenticated) return;

        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:5000/api/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ cart })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al procesar el pago');
            }

            setSuccess(true);
            clearCart(); // Limpia el carrito después de la compra exitosa
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Carrito de Compras</h2>
                {cart.length > 0 && !success && (
                    <Button variant="outline-danger" onClick={clearCart}>
                        Vaciar Carrito
                    </Button>
                )}
            </div>

            {success ? (
                <Alert variant="success" className="text-center">
                    <Alert.Heading>¡Compra realizada con éxito!</Alert.Heading>
                    <p>Tu pedido ha sido procesado correctamente.</p>
                    <hr />
                    <div className="d-flex justify-content-center">
                        <Button as={Link} to="/" variant="outline-success">
                            Volver a la tienda
                        </Button>
                    </div>
                </Alert>
            ) : cart.length === 0 ? (
                <div className="text-center">
                    <p>El carrito está vacío</p>
                    <Button as={Link} to="/" variant="primary">Ver Pizzas</Button>
                </div>
            ) : (
                <>
                    {error && (
                        <Alert variant="danger" className="mb-4">
                            {error}
                        </Alert>
                    )}

                    {cart.map((pizza) => (
                        <Card key={pizza.id} className="mb-3">
                            <div className="row g-0">
                                <div className="col-md-2">
                                    <img
                                        src={pizza.img}
                                        className="img-fluid rounded-start"
                                        alt={pizza.name}
                                        style={{ height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title text-capitalize">{pizza.name}</h5>
                                            <div>
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    className="mb-2"
                                                    onClick={() => removeFromCart(pizza.id)}
                                                    disabled={loading}
                                                >
                                                    🗑️ Eliminar
                                                </Button>
                                                <p className="card-text mb-0">Precio unidad: ${pizza.price.toLocaleString()}</p>
                                                <p className="card-text fw-bold">
                                                    Total: ${(pizza.price * pizza.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 mt-2">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => decrementQuantity(pizza.id)}
                                                disabled={pizza.quantity <= 1 || loading}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2 fw-bold">{pizza.quantity}</span>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => incrementQuantity(pizza.id)}
                                                disabled={loading}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <div className="text-end mt-4">
                        <h4>Total del Carrito: ${total.toLocaleString()}</h4>
                        <Button 
                            variant="success" 
                            size="lg" 
                            className="mt-2"
                            disabled={!isAuthenticated || loading}
                            onClick={handleCheckout}
                            title={!isAuthenticated ? "Inicia sesión para continuar con el pago" : ""}
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Procesando...
                                </>
                            ) : isAuthenticated ? "Ir a Pagar" : "Inicia sesión para pagar"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;