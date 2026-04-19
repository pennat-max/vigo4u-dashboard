// components/dashboard/KpiCards.tsx
import type { DashboardKPIs } from '@/types/database'
import { formatNumber } from '@/lib/utils'

interface KpiCardsProps {
  kpis: DashboardKPIs
}

const cards = [
  {
    key: 'total' as const,
    label: 'รถทั้งหมด',
    icon: '🚗',
    color: 'border-l-slate-400',
    textColor: 'text-slate-700',
  },
  {
    key: 'available' as const,
    label: 'พร้อมขาย',
    icon: '✅',
    color: 'border-l-emerald-500',
    textColor: 'text-emerald-700',
  },
  {
    key: 'booked' as const,
    label: 'จองแล้ว',
    icon: '🔒',
    color: 'border-l-amber-500',
    textColor: 'text-amber-700',
  },
  {
    key: 'shipped' as const,
    label: 'ส่งออกแล้ว',
    icon: '🚢',
    color: 'border-l-blue-500',
    textColor: 'text-blue-700',
  },
  {
    key: 'doc_pending' as const,
    label: 'เอกสารค้าง',
    icon: '📋',
    color: 'border-l-red-500',
    textColor: 'text-red-700',
  },
]

export default function KpiCards({ kpis }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`bg-white rounded-xl border border-gray-200 border-l-4 ${card.color} px-4 py-3 shadow-sm`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 font-medium">{card.label}</span>
            <span className="text-base leading-none">{card.icon}</span>
          </div>
          <p className={`text-2xl font-bold ${card.textColor}`}>
            {formatNumber(kpis[card.key])}
          </p>
          {card.key !== 'total' && kpis.total > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">
              {Math.round((kpis[card.key] / kpis.total) * 100)}% ของทั้งหมด
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
