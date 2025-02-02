import { Navbar as NavbarBs, Container, Nav } from 'react-bootstrap'

const Navbar = () => {
    const total = 25000;
    const token = false;

    return (
        <NavbarBs variant="dark" bg="dark" expand="lg">
            <Container>
                <NavbarBs.Brand href="#home">🍕 Home</NavbarBs.Brand>
                <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
                <NavbarBs.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {token ? (
                            <>
                                <Nav.Link href="#profile" className="text-white">🔓 Profile</Nav.Link>
                                <Nav.Link href="#logout" className="text-white">🔒 Logout</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="#login" className="text-white">🔐 Login</Nav.Link>
                                <Nav.Link href="#register" className="text-white">🔐 Register</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="#cart" className="text-white">
                            🛒 Total: ${total.toLocaleString()}
                        </Nav.Link>
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    )
}

export default Navbar