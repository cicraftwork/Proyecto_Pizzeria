import './App.css'
import Navbar from './components/Navbar/Navbar'
//import Home from './components/Home/Home'//
import Footer from './components/Footer/Footer'
import RegisterPage from './components/Pages/RegisterPage'
import LoginPage from './components/Pages/LoginPage'

function App() {
  return (
    <>
      <Navbar />
      {/* <Home /> */}
      {/*<RegisterPage /> */}
      <LoginPage /> 
      <Footer />
    </>
  )
}

export default App