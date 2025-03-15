// src/pages/CartPage.jsx
import { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';

const CartPage = () => {
    // Contextos
    const { cart, total, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { token } = useContext(UserContext); //Consume el contexto

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Carrito de Compras</h2>
                {cart.length > 0 && (
                    <Button variant="outline-danger" onClick={clearCart}>
                        Vaciar Carrito
                    </Button>
                )}
            </div>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p>El carrito está vacío</p>
                    <Button as={Link} to="/" variant="primary">Ver Pizzas</Button>
                </div>
            ) : (
                <>
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
                                                disabled={pizza.quantity <= 1}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2 fw-bold">{pizza.quantity}</span>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => incrementQuantity(pizza.id)}
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
                            disabled={!token}
                            title={!token ? "Inicia sesión para continuar con el pago" : ""}
                        >
                            {token ? "Ir a Pagar" : "Inicia sesión para pagar"}
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;