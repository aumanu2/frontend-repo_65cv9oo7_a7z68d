import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

function Step({ label, active }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs ${active ? 'bg-green-600' : 'bg-gray-300'}`}>
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <span className={`text-sm ${active ? 'font-medium' : 'text-gray-500'}`}>{label}</span>
    </div>
  )
}

export default function OrdersPage({ cart, setCart, tableId = 'T-03' }) {
  const [notes, setNotes] = useState('')
  const [orders, setOrders] = useState([])
  const total = useMemo(() => cart.reduce((s,i)=> s + i.price * i.quantity, 0), [cart])

  async function placeOrder() {
    if (cart.length === 0) return
    const payload = {
      table_id: tableId,
      items: cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
      special_instructions: notes,
    }
    try {
      const res = await fetch(`${backend}/orders`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) })
      const data = await res.json()
      setCart([])
      fetchOrders()
      alert(`Order placed! ETA ${data.eta} mins`)
    } catch (e) {
      console.error(e)
    }
  }

  async function fetchOrders() {
    try {
      const res = await fetch(`${backend}/orders?table_id=${tableId}`)
      const data = await res.json()
      setOrders(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  return (
    <div className="max-w-md mx-auto px-4 pb-24 space-y-4">
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-4 py-3 border-b font-semibold">Current Order</div>
        <div className="p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-sm text-gray-500">Your cart is empty.</div>
          ) : (
            cart.map((i,idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="text-sm">{i.quantity}x {i.name}</div>
                <div className="text-sm font-medium">₹{i.quantity * i.price}</div>
              </div>
            ))
          )}
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Any special requests or instructions?" className="w-full border rounded-md p-2 text-sm" />
          <button onClick={placeOrder} className="w-full bg-green-600 text-white py-2 rounded-md font-semibold">› Place Order</button>
        </div>
        {cart.length > 0 && (
          <div className="px-4 py-3 border-t flex items-center justify-between">
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-semibold">₹{total}</div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border shadow-sm">
        <div className="px-4 py-3 border-b font-semibold">Order Status</div>
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Step label="Order Placed" active />
            <Step label="Preparing" active={false} />
            <Step label="Ready" active={false} />
            <Step label="Delivered" active={false} />
          </div>
          <div className="text-sm text-gray-600">Estimated time: 5 mins</div>
        </div>
      </div>

      <details className="bg-white rounded-xl border shadow-sm">
        <summary className="px-4 py-3 border-b font-semibold cursor-pointer">Order History</summary>
        <div className="p-4 space-y-3">
          {orders.map((o)=> (
            <div key={o.id} className="border rounded-md p-3">
              <div className="text-sm text-gray-500 mb-1">{o.status}</div>
              {o.items.map((i,idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div>
                    {i.name} {i.quantity > 1 ? `x${i.quantity}` : ''} {i.notes ? `- ${i.notes}` : ''}
                  </div>
                  <div className="font-medium">₹{i.quantity * i.price}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </details>
    </div>
  )
}
