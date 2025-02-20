import { useState, useEffect } from 'react'

const Pizza = () => {
   const [pizza, setPizza] = useState(null)
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState(null)

   useEffect(() => {
       const fetchPizza = async () => {
           try {
               const response = await fetch('http://localhost:5000/api/pizzas/p001')
               if (!response.ok) {
                   throw new Error('Error al cargar la pizza')
               }
               const data = await response.json()
               setPizza(data)
           } catch (error) {
               setError(error.message)
           } finally {
               setLoading(false)
           }
       }
       fetchPizza()
   }, [])

   if (loading) return <div className="text-center mt-5">Cargando pizza...</div>
   if (error) return <div className="text-center mt-5 text-danger">{error}</div>
   if (!pizza) return <div className="text-center mt-5">No se encontró la pizza</div>

   return (
       <div className="container mt-5">
           <div className="card mb-3">
               <div className="row g-0">
                   <div className="col-md-6">
                       <img
                           src={pizza.img}
                           className="img-fluid rounded-start"
                           alt={pizza.name}
                           style={{height: '100%', objectFit: 'cover'}}
                       />
                   </div>
                   <div className="col-md-6">
                       <div className="card-body">
                           <h2 className="card-title">{pizza.name}</h2>
                           <p className="card-text">{pizza.desc}</p>

                           <h5 className="mt-3">Ingredientes:</h5>
                           <ul className="list-unstyled">
                               {pizza.ingredients.map((ingredient) => (
                                   <li key={`ingredient-${ingredient}`}>🍕 {ingredient}</li>
                               ))}
                           </ul>

                           <div className="d-flex justify-content-between align-items-center mt-4">
                               <h4 className="text-success mb-0">Precio: ${pizza.price}</h4>
                               <button className="btn btn-danger">
                                   Añadir al carrito
                               </button>
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </div>
   )
}

export default Pizza