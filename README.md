## Descripción
Este proyecto es una aplicación web para una pizzería desarrollada con React que permite a los usuarios explorar el menú de pizzas, ver detalles de cada pizza, agregarlas al carrito de compras y gestionar su pedido. Forma parte del bootcamp de Desarrollo Full Stack JavaScript - Módulo 4: React I de Desafío Latam.

## Tecnologías Utilizadas
- React 18
- Vite
- React Router 6
- React Bootstrap
- Context API
- Fetch API para consumo de datos

## Funcionalidades Implementadas
- Visualización de catálogo de pizzas
- Detalle de cada pizza con ingredientes y descripción
- Carrito de compras con funcionalidad de agregar/eliminar items
- Cálculo automático del total de compra
- Sistema de navegación entre vistas
- Persistencia de carrito mediante localStorage
- Gestión de estado global con Context API
- Formularios de registro e inicio de sesión con validaciones

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
│   │   └── PizzaContext.jsx
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
└── vite.config.js
```

## Hitos del Proyecto
El proyecto se desarrolla a través de varios hitos incrementales:

1. **Introducción a React** - Componentes básicos y estructura
2. **Estado de los componentes y eventos** - Formularios y validación
3. **Renderización dinámica de componentes** - Listas y carrito de compras
4. **Consumo de APIs con React** - Integración con backend
5. **React Router I** - Sistema de navegación
6. **Context** - Gestión de estado global
7. **React Router II** - Rutas protegidas (próximo)
8. **JWT** - Autenticación (próximo)

## Contextos implementados
- **PizzaContext**: Maneja el estado global de las pizzas disponibles y proporciona funciones para obtener datos de la API.
- **CartContext**: Gestiona el estado del carrito de compras, incluyendo agregar/eliminar items y calcular el total.

## Rutas implementadas
- `/`: Página principal que muestra todas las pizzas disponibles
- `/pizza/:id`: Detalle de una pizza específica
- `/cart`: Carrito de compras
- `/register`: Formulario de registro de usuarios
- `/login`: Inicio de sesión de usuarios
- `/profile`: Perfil de usuario
- `*`: Página de 404 Not Found

## Backend de la aplicación
La aplicación consume datos de una API local que corre en http://localhost:5000/api:
- `/pizzas`: Obtiene todas las pizzas disponibles
- `/pizzas/:id`: Obtiene el detalle de una pizza específica

## Componentes Principales

### CardPizza
**Descripción:** Tarjeta para mostrar información de una pizza
**Props:**
- `pizza`: Objeto con datos de la pizza (id, name, price, ingredients, img)
**Funcionalidad:** Muestra la información básica de una pizza y permite añadirla al carrito

### RegisterPage
**Descripción:** Formulario de registro de usuarios
**Estados:**
- `email`: Correo del usuario
- `password`: Contraseña (min 6 caracteres)
- `confirmPassword`: Validación de contraseña
- `errors`: Objeto con mensajes de error por campo
**Validaciones:**
- Email válido con formato correcto
- Contraseña mínimo 6 caracteres
- Confirmación de contraseña coincidente

### LoginPage
**Descripción:** Formulario de inicio de sesión
**Estados:**
- `email`: Correo del usuario
- `password`: Contraseña
- `error`: Estado para mostrar errores de validación

## Instalación y Ejecución
1. Clonar este repositorio
   ```
   git clone https://github.com/cicraftwork/Proyecto_Pizzeria.git
   ```
2. Instalar dependencias
   ```
   npm install
   ```
3. Iniciar el servidor de desarrollo
   ```
   npm run dev
   ```
4. Acceder a la aplicación en: http://localhost:5173

## Requisitos 
- Node.js >= 14
- Tener el servidor backend de pizzas en ejecución en http://localhost:5000

## Contribuir
Este proyecto está desarrollado con fines educativos como parte del bootcamp de Desarrollo Full Stack JavaScript de Desafío Latam.

---

Desarrollado por [cicraftwork](https://github.com/cicraftwork)