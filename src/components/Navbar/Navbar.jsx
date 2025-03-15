// src/components/Navbar/Navbar.jsx
import { Navbar as NavbarBs, Container, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { UserContext } from '../../context/UserContext';

const Navbar = () => {
    // Contextos
    const { total } = useContext(CartContext);
    const { token, logout } = useContext(UserContext); // Consume el contexto

    // Función para estilo de enlaces activos
    const setActive = ({ isActive }) => isActive ? "text-white fw-bold" : "text-white";

    return (
        <NavbarBs variant="dark" bg="dark" expand="lg" fixed="top">
            <Container>
                <NavbarBs.Brand as={Link} to="/">🍕 Pizzería Mamma Mía!</NavbarBs.Brand>
                <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBs.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" className={setActive}>
                            🏠 Home
                        </Nav.Link>

                        {token ? (
                            <>
                                <Nav.Link as={NavLink} to="/profile" className={setActive}>
                                    🔓 Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/" className="text-white" onClick={logout}>
                                    🔒 Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className={setActive}>
                                    🔐 Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className={setActive}>
                                    🔐 Register
                                </Nav.Link>
                            </>
                        )}

                        <Nav.Link as={NavLink} to="/cart" className={setActive}>
                            🛒 Total: ${total.toLocaleString()}
                        </Nav.Link>
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    );
};

export default Navbar;