import { useMemo, useState } from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import HomePage from './components/HomePage'
import OrdersPage from './components/OrdersPage'
import { Routes, Route, useLocation } from 'react-router-dom'

export default function App() {
  const [cart, setCart] = useState([])
  const location = useLocation()
  const payBadge = 3 // example badge for Pay Bill

  function addToCart(item) {
    setCart(prev => {
      const idx = prev.findIndex(p => p.name === item.name)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 }
        return copy
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const showBack = location.pathname !== '/'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header tableId="T-03" showBack={showBack} />
      <main className="pt-2 pb-20">
        <Routes>
          <Route path="/" element={<HomePage onAdd={addToCart} />} />
          <Route path="/orders" element={<OrdersPage cart={cart} setCart={setCart} tableId="T-03" />} />
          <Route path="/menu" element={<HomePage onAdd={addToCart} />} />
          <Route path="/pay" element={<div className="max-w-md mx-auto p-4">Payment coming soon</div>} />
        </Routes>
      </main>
      <NavBar payBadge={payBadge} />
    </div>
  )
}
