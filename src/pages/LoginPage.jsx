// src/pages/LoginPage.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Button, Spinner } from 'react-bootstrap';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    
    const { login, loading } = useContext(UserContext);
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validación del email
        if (!email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!validateEmail(email)) {
            newErrors.email = 'El formato del email no es válido';
        }

        // Validación de la contraseña
        if (!password) {
            newErrors.password = 'La contraseña es obligatoria';
        } else if (password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (Object.keys(newErrors).length === 0) {
            const success = await login(email, password);
            if (success) {
                navigate('/');
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-5">
            <h1 className="text-center mb-4">Iniciar Sesión</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <Button 
                            type="submit" 
                            className="w-100" 
                            variant="primary"
                            disabled={loading}
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
                                    Iniciando sesión...
                                </>
                            ) : 'Iniciar Sesión'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;