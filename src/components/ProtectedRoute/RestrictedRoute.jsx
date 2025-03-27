import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PropTypes from 'prop-types';

const RestrictedRoute = ({ children }) => {
  const { token } = useContext(UserContext);

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
};

RestrictedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default RestrictedRoute;