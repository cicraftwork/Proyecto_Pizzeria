const Profile = () => {
  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{maxWidth: "400px"}}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Mi Perfil</h2>
          <p className="card-text">Email: usuario@example.com</p>
          <button className="btn btn-danger w-100">Cerrar Sesión</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;