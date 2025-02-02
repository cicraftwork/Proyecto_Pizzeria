import headerImage from '../../assets/img/Header.jpg'

const Header = () => {
    return (
        <div className="header text-center text-white position-relative"
             style={{
                 backgroundImage: `url(${headerImage})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 minHeight: '300px', // Reducimos de 400px a 300px
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center'
             }}>
            {/* Overlay oscuro */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }}></div>

            {/* Contenido centrado */}
            <div className="position-relative" style={{ zIndex: 1 }}>
                <h1 className="display-4 fw-bold mb-3">¡Pizzería Mamma Mía!</h1>
                <p className="fs-5 mb-0">¡Tenemos las mejores pizzas que podrás encontrar!</p>
            </div>
        </div>
    )
}

export default Header