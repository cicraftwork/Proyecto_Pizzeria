import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Button, Spinner } from 'react-bootstrap';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { register, loading } = useContext(UserContext);
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

        // Validación de confirmación de contraseña
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Debe confirmar la contraseña';
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        if (Object.keys(newErrors).length === 0) {
            const success = await register(email, password);
            if (success) {
                navigate('/');
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1 className="text-center mb-4">Registro</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="register-email" className="form-label">Email</label>
                            <input
                                id="register-email"
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-password" className="form-label">Contraseña</label>
                            <input
                                id="register-password"
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="register-confirm-password" className="form-label">Confirmar contraseña</label>
                            <input
                                id="register-confirm-password"
                                type="password"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
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
                                    Registrando...
                                </>
                            ) : 'Registrarse'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;