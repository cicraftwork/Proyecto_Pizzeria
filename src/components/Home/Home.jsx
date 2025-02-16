import { useState } from 'react'
import Header from '../Header/Header'
import CardPizza from '../CardPizza/CardPizza'
import { pizzas } from '../../assets/js/pizzas'

const Home = () => {
    // Usamos useState para manejar el estado de las pizzas
    const [pizzasList, setPizzasList] = useState(pizzas)

    return (
        <>
            {/* Header que muestra el banner principal */}
            <Header />

            {/* Contenedor principal para las pizzas */}
            <div className="container mt-5">
                <div className="row g-4">
                    {/* Mapeamos el array de pizzas para crear las cards */}
                    {pizzasList.map((pizza) => (
                        <div key={pizza.id} className="col-12 col-md-6 col-lg-4">
                            <CardPizza
                                name={pizza.name}
                                price={pizza.price}
                                ingredients={pizza.ingredients}
                                img={pizza.img}
                                desc={pizza.desc}
                                id={pizza.id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home