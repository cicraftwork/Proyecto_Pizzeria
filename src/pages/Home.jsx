import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import CardPizza from '../components/CardPizza/CardPizza';

const Home = () => {
 const [pizzasList, setPizzasList] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
   const fetchPizzas = async () => {
     try {
       const response = await fetch('http://localhost:5000/api/pizzas');
       if (!response.ok) {
         throw new Error('Error al cargar las pizzas');
       }
       const data = await response.json();
       setPizzasList(data);
     } catch (error) {
       setError(error.message);
     } finally {
       setLoading(false);
     }
   };
   fetchPizzas();
 }, []);

 if (loading) return <div className="text-center mt-5">Cargando pizzas...</div>;
 if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

 return (
   <>
     <Header />
     <div className="container mt-5">
       <div className="row g-4">
         {pizzasList.map(pizza => (
           <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
             <CardPizza
               name={pizza.name}
               price={pizza.price}
               ingredients={pizza.ingredients}
               img={pizza.img}
             />
           </div>
         ))}
       </div>
     </div>
   </>
 );
};

export default Home;