import { useState } from 'react'
import './app.css'

export default function App() {

  const products = [
    { name: "Raincoat for fishes ", price: 35 },
    { name: "Slippers for sharks", price: 75 },
    { name: "Gloves for Snakes", price: 20 }
  ]

  const [cart, setCart] = useState([])

  const addToCart = (index) => {
    setCart([...cart, products[index]])
  }

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  const total = cart.reduce((acc, item) => acc + item.price, 0)

  return (
    <>
      <header>Pet supply store</header>

      <div className="container">

        <div className="grid">

          <div className="card">
            <h2>Productos Disponibles</h2>

            {products.map((p, i) => (
              <div key={i} className="product">
                <span>{p.name} - ${p.price}</span>
                <button data-testid={`add-${i}`} onClick={() => addToCart(i)}>
                  Añadir al Carrito
                </button>
              </div>
            ))}
          </div>

          <div className="card">
            <h2>Carrito</h2>

            {cart.length === 0 && (
              <p>El carrito está vacío.</p>
            )}

            {cart.map((item, i) => (
              <div key={i} className="cart-item" data-testid={`cart-item-${i}`}>
                <span>{item.name} - ${item.price}</span>
                <button
                  className="remove-btn"
                  data-testid={`remove-${i}`}
                  onClick={() => removeFromCart(i)}
                >
                  Eliminar
                </button>
              </div>
            ))}

            <div className="total" data-testid="cart-total">
              Total: ${total}
            </div>
          </div>

        </div>

        <div className="footer">
          Ejercicio Módulo 04 - Web System Development 
          By Javier Arroyo Priego and Luis Corrales López
        </div>

      </div>
    </>
  )
}
