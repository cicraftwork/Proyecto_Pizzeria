import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { pizzaCart } from '../../assets/js/pizzas';

const CartPage = () => {
    const [cart, setCart] = useState(pizzaCart);

    const updateQuantity = (id, increment) => {
        setCart(prevCart => {
            const newCart = prevCart.map(pizza => {
                if (pizza.id === id) {
                    const newCount = Number(pizza.count) + increment;
                    return { ...pizza, count: newCount };
                }
                return pizza;
            });
            return newCart;
        });
    };

    const removePizza = (id) => {
        setCart(prevCart => prevCart.filter(pizza => pizza.id !== id));
    };

    const calculateTotal = () => {
        const total = cart.reduce((sum, pizza) => {
            const itemTotal = Number(pizza.price) * Number(pizza.count);
            return sum + itemTotal;
        }, 0);
        return total;
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Carrito de Compras</h2>
            {cart.length === 0 ? (
                <p className="text-center">El carrito está vacío</p>
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
                                                    onClick={() => removePizza(pizza.id)}
                                                >
                                                    🗑️ Eliminar
                                                </Button>
                                                <p className="card-text mb-0">Precio unidad: ${Number(pizza.price).toLocaleString()}</p>
                                                <p className="card-text fw-bold">
                                                    Total: ${(Number(pizza.price) * Number(pizza.count)).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 mt-2">
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => updateQuantity(pizza.id, -1)}
                                                disabled={pizza.count <= 1}
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2 fw-bold">{pizza.count}</span>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                onClick={() => updateQuantity(pizza.id, 1)}
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
                        <h4>Total del Carrito: ${calculateTotal().toLocaleString()}</h4>
                        <Button variant="success" size="lg" className="mt-2">Ir a Pagar</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;