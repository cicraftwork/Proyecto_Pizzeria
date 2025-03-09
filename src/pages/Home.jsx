import { useContext } from 'react';
import Header from '../components/Header/Header';
import CardPizza from '../components/CardPizza/CardPizza';
import { PizzaContext } from '../context/PizzaContext';

const Home = () => {
  // Usamos el contexto de pizzas
  const { pizzas, loading, error } = useContext(PizzaContext);

  if (loading) return <div className="text-center mt-5">Cargando pizzas...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row g-4">
          {pizzas && pizzas.map(pizza => (
            <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
              <CardPizza pizza={pizza} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;