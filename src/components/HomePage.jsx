import { useEffect, useState } from 'react'
import { ChevronRight } from 'lucide-react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

const categories = [
  'Burgers','Pizza','Pasta','Desserts','Drinks','Salads','Appetizers',"Chef's Specials"
]

function PromoCarousel() {
  return (
    <div className="w-full overflow-hidden">
      <div className="h-36 sm:h-44 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-4 text-white flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide opacity-90">Special Offer</div>
          <div className="text-xl font-semibold">Healthy Menu</div>
          <div className="text-xs opacity-90">Fresh, balanced and delicious</div>
        </div>
        <ChevronRight className="opacity-80" />
      </div>
    </div>
  )
}

function CategoryScroller({ onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
      {categories.map(c => (
        <button key={c} onClick={() => onSelect?.(c)} className="flex-shrink-0 px-3 py-1.5 rounded-full border text-sm bg-white hover:bg-gray-50">
          {c}
        </button>
      ))}
    </div>
  )
}

function FeaturedCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex gap-4">
      <div className="h-20 w-24 bg-amber-100 rounded-lg" />
      <div className="flex-1">
        <div className="font-semibold">{item?.name || 'Coconut Curry Ramen Bowl'}</div>
        <div className="text-sm text-gray-500">{item?.description || 'Fragrant coconut broth, ramen, veggies'}</div>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-semibold">₹{item?.price ?? 350}</div>
          <button onClick={() => onAdd(item)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md">Add</button>
        </div>
      </div>
    </div>
  )
}

function SmallCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-lg border p-3">
      <div className="h-20 w-full bg-gray-100 rounded-md" />
      <div className="mt-2 text-sm font-medium truncate">{item.name}</div>
      <div className="text-xs text-gray-500 truncate">{item.description}</div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-sm font-semibold">₹{item.price}</div>
        <button onClick={() => onAdd(item)} className="px-2 py-1 text-xs bg-blue-600 text-white rounded">Add</button>
      </div>
    </div>
  )
}

export default function HomePage({ onAdd }) {
  const [menu, setMenu] = useState([])
  const [featured, setFeatured] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${backend}/menu`)
        const data = await res.json()
        setMenu(data)
        setFeatured(data.find(d => d.is_featured) || data[0])
      } catch (e) {
        // fallback sample
        const data = [
          {name:'Coconut Curry Ramen Bowl', description:'Fragrant coconut broth, ramen, veggies', price:350, category:"Chef's Specials", is_featured:true},
          {name:'Ini Salad', description:'Fresh greens mix', price:180, category:'Salads'},
          {name:'Appetizer', description:'Small bites', price:120, category:'Appetizers'},
          {name:'Thai dessert', description:'Sweet finish', price:150, category:'Desserts'},
        ]
        setMenu(data)
        setFeatured(data[0])
      }
    }
    load()
  }, [])

  return (
    <div className="max-w-md mx-auto px-4 pb-24 space-y-4">
      <PromoCarousel />
      <CategoryScroller onSelect={() => {}} />
      <FeaturedCard item={featured} onAdd={onAdd} />
      <div>
        <div className="font-semibold mb-2">Trending Tastes Around You</div>
        <div className="grid grid-cols-2 gap-3">
          {menu.slice(1,5).map((m,i) => (
            <SmallCard key={i} item={m} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </div>
  )
}
