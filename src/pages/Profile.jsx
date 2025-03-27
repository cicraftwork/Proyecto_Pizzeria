// src/pages/Profile.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Card, Button, Spinner } from 'react-bootstrap';

const Profile = () => {
  const { userEmail, logout, getProfile, loading } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await getProfile();
      if (profileData) {
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container py-5">
      <Card className="mx-auto" style={{maxWidth: "400px"}}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Mi Perfil</Card.Title>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            </div>
          ) : (
            <>
              <Card.Text>
                <strong>Email:</strong> {userEmail || 'No disponible'}
              </Card.Text>
              {profile && (
                <div className="mt-3">
                  <p className="mb-1"><strong>ID de usuario:</strong> {profile.id}</p>
                  <p className="mb-1"><strong>Fecha de registro:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
              )}
              <Button 
                variant="danger" 
                className="w-100 mt-3"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;