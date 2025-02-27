import { Navbar as NavbarBS, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const total = 25000;
  const token = true;

  return (
    <NavbarBS variant="dark" bg="dark" expand="lg">
      <Container>
        <NavbarBS.Brand as={Link} to="/">🍕 Pizzería Mamma Mía!</NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBS.Collapse id="basic-navbar-nav">
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
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
};

export default Navbar;