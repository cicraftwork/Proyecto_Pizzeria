// src/pages/Profile.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{maxWidth: "400px"}}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Mi Perfil</h2>
          <p className="card-text">Email: usuario@example.com</p>
          <button 
            className="btn btn-danger w-100"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;