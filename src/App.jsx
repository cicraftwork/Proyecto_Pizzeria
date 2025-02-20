import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Pizza from './components/Pages/Pizza'
import Home from './components/Home/Home'
//import RegisterPage from './components/Pages/RegisterPage'
//import LoginPage from './components/Pages/LoginPage'
//import CartPage from './components/Pages/CartPage'

function App() {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      <Pizza />
      {/* <RegisterPage /> */}
      {/* <LoginPage /> */}
      {/* <CartPage /> */}
      <Footer />
    </>
  )
}

export default App