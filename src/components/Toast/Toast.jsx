import { Toast as BootstrapToast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [show, setShow] = useState(true);

  // Cerrar después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // color del Toast basado en el tipo
  const getBgColor = () => {
    switch (type) {
      case 'success': return 'success';
      case 'danger': return 'danger';
      case 'warning': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <BootstrapToast
      show={show}
      onClose={() => {
        setShow(false);
        if (onClose) onClose();
      }}
      className="position-fixed bottom-0 end-0 m-3"
      bg={getBgColor()}
      text={type === 'warning' ? 'dark' : 'white'}
    >
      <BootstrapToast.Header closeButton>
        <strong className="me-auto">
          {type === 'success' && '✅ Éxito'}
          {type === 'danger' && '❌ Error'}
          {type === 'warning' && '⚠️ Advertencia'}
          {type === 'info' && 'ℹ️ Información'}
        </strong>
      </BootstrapToast.Header>
      <BootstrapToast.Body>{message}</BootstrapToast.Body>
    </BootstrapToast>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'warning', 'info']),
  onClose: PropTypes.func
};

export default Toast;