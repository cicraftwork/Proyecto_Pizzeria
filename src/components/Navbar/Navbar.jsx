import { Navbar as NavbarBs, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
    // contexto del carrito
    const { total } = useContext(CartContext);

    // Token simulado para autenticación
    const token = true;

    return (
        <NavbarBs variant="dark" bg="dark" expand="lg" fixed="top">
            <Container>
                <NavbarBs.Brand as={Link} to="/">🍕 Pizzería Mamma Mía!</NavbarBs.Brand>
                <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBs.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {token ? (
                            <>
                                <Nav.Link as={Link} to="/profile" className="text-white">🔓 Profile</Nav.Link>
                                <Nav.Link as={Link} to="/logout" className="text-white">🔒 Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="text-white">🔐 Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="text-white">🔐 Register</Nav.Link>
                            </>
                        )}
                        <Nav.Link as={Link} to="/cart" className="text-white">
                            🛒 Total: ${total.toLocaleString()}
                        </Nav.Link>
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    );
};

export default Navbar;