import { PhoneCall, ChevronLeft } from 'lucide-react'

export default function Header({ tableId = 'T-03', title = 'DineZen', showBack = false }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <div className="max-w-md mx-auto flex items-center gap-3 px-4 py-3">
        {showBack && (
          <button onClick={() => history.back()} aria-label="Back" className="p-1 -ml-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <div className="flex-1">
          <div className="text-lg font-semibold">DineZen</div>
          <div className="text-xs text-gray-500">Table {tableId}</div>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md shadow hover:bg-blue-700">
          <PhoneCall className="h-4 w-4" />
          Call Waiter
        </button>
      </div>
    </header>
  )
}
