🍕 Pizzería Mamma Mía - Proyecto React

## Descripción
Este proyecto es una aplicación web para una pizzería desarrollada con React que permite a los usuarios explorar el menú de pizzas, ver detalles de cada pizza, agregarlas al carrito de compras, gestionar su pedido y autenticarse mediante JWT. Forma parte del bootcamp de Desarrollo Full Stack JavaScript - Módulo 4: React de Desafío Latam.

## Tecnologías Utilizadas
- React 18
- Vite
- React Router 6
- React Bootstrap
- Context API
- Fetch API para consumo de datos
- JWT para autenticación

## Funcionalidades Implementadas
- Visualización de catálogo de pizzas
- Detalle de cada pizza con ingredientes y descripción
- Carrito de compras con funcionalidad de agregar/eliminar items
- Cálculo automático del total de compra
- Sistema de navegación entre vistas
- Persistencia de carrito mediante localStorage
- Gestión de estado global con Context API
- Formularios de registro e inicio de sesión con validaciones
- Autenticación de usuarios mediante JWT
- Rutas protegidas basadas en autenticación
- Checkout para completar la compra (requiere autenticación)

## Estructura del Proyecto
```
PROYECTO_PIZZERIA/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   ├── img/
│   │   │   └── Header.jpg
│   │   └── js/
│   │       └── pizzas.js
│   ├── components/
│   │   ├── CardPizza/
│   │   │   └── CardPizza.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── Header/
│   │   │   └── Header.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   └── Toast/
│   │       └── Toast.jsx
│   ├── context/
│   │   ├── CartContext.jsx
│   │   ├── PizzaContext.jsx
│   │   └── UserContext.jsx
│   ├── pages/
│   │   ├── CartPage.jsx
│   │   ├── Home.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── Pizza.jsx
│   │   ├── ProfilePage.jsx
│   │   └── RegisterPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── main.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── README.md
```

## Hitos del Proyecto
El proyecto se desarrolló a través de varios hitos incrementales:

1. **Introducción a React** - Componentes básicos y estructura
2. **Estado de los componentes y eventos** - Formularios y validación
3. **Renderización dinámica de componentes** - Listas y carrito de compras
4. **Consumo de APIs con React** - Integración con backend
5. **React Router I** - Sistema de navegación
6. **Context** - Gestión de estado global
7. **React Router II** - Rutas protegidas y parámetros
8. **JWT** - Autenticación y autorización

## Instalación y Ejecución

### Frontend
1. Clonar este repositorio
   ```bash
   git clone https://github.com/tu-usuario/Proyecto_Pizzeria.git
   ```
2. Instalar dependencias
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo
   ```bash
   npm run dev
   ```
4. Acceder a la aplicación en: http://localhost:5173

### Backend
1. Iniciar el servidor backend en un directorio separado
   ```bash
   npm start
   ```
2. El servidor backend debe estar disponible en http://localhost:5000

## Credenciales de prueba
Para probar la aplicación con un usuario existente:
- Email: test@test.com
- Password: 123123

## Principales Contextos Implementados

### UserContext
- Gestiona el estado de autenticación del usuario
- Proporciona métodos para:
  - Registro de usuarios (register)
  - Inicio de sesión (login)
  - Cierre de sesión (logout)
  - Obtención de perfil (getProfile)
- Mantiene el token JWT y email del usuario

### CartContext
- Gestiona el estado global del carrito de compras
- Proporciona funciones para:
  - Agregar productos al carrito
  - Eliminar productos del carrito
  - Incrementar/decrementar cantidades
  - Calcular total de la compra
  - Limpiar el carrito

### PizzaContext
- Maneja el estado global de las pizzas disponibles
- Proporciona funciones para obtener datos de la API
- Centraliza la lógica de consumo de datos

## Flujo de autenticación
1. El usuario se registra o inicia sesión
2. El backend genera un token JWT
3. El frontend almacena el token en localStorage
4. El token se incluye en los headers de las peticiones a rutas protegidas
5. El backend valida el token y permite/deniega el acceso

## Rutas Implementadas
- `/`: Página principal (Home)
- `/register`: Registro de usuarios
- `/login`: Inicio de sesión
- `/cart`: Carrito de compras
- `/pizza/:id`: Detalle de una pizza específica
- `/profile`: Perfil de usuario (ruta protegida)
- `*`: Página de error para rutas no encontradas

## Endpoints del Backend
- **Autenticación**
  - `POST /api/auth/login`: Inicio de sesión
  - `POST /api/auth/register`: Registro de usuario
  - `GET /api/auth/me`: Obtener perfil de usuario (requiere token)
- **Productos**
  - `GET /api/pizzas`: Obtener todas las pizzas
  - `GET /api/pizzas/:id`: Obtener una pizza específica
- **Compras**
  - `POST /api/checkouts`: Procesar compra (requiere token)

## Características de Seguridad
- Autenticación mediante JWT
- Rutas protegidas que requieren autenticación
- Validación de formularios
- Protección contra acceso no autorizado a rutas privadas
- Redirección automática basada en estado de autenticación


---

## Contribución
Este proyecto está desarrollado con fines educativos como parte del bootcamp de Desarrollo Full Stack JavaScript de Desafío Latam.

---

Desarrollado por CI Craftwork (https://github.com/cicraftwork) - Desafío Latam 2025