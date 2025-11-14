import { Home, UtensilsCrossed, Receipt, CreditCard } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Tab = ({ to, icon: Icon, label, active, badge }) => (
  <Link to={to} className="flex-1">
    <div className={`flex flex-col items-center justify-center py-2 ${active ? 'text-blue-600' : 'text-gray-500'}`}>
      <div className="relative">
        <Icon size={22} />
        {badge ? (
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center text-xs bg-red-500 text-white rounded-full h-4 w-4">{badge}</span>
        ) : null}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  </Link>
)

export default function NavBar({ payBadge = 0 }) {
  const location = useLocation()
  const path = location.pathname
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/90 backdrop-blur z-50">
      <div className="max-w-md mx-auto flex">
        <Tab to="/" icon={Home} label="Home" active={path === '/'} />
        <Tab to="/menu" icon={UtensilsCrossed} label="Menu" active={path === '/menu'} />
        <Tab to="/orders" icon={Receipt} label="Orders" active={path === '/orders'} />
        <Tab to="/pay" icon={CreditCard} label="Pay Bill" active={path === '/pay'} badge={payBadge || 0} />
      </div>
    </nav>
  )
}
