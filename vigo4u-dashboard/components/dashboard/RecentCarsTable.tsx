// components/dashboard/RecentCarsTable.tsx
import Link from 'next/link'
import type { Car } from '@/types/database'
import { formatDate, getStatusConfig, carDisplayName } from '@/lib/utils'
import StatusBadge from '@/components/cars/StatusBadge'

interface RecentCarsTableProps {
  cars: Car[]
}

export default function RecentCarsTable({ cars }: RecentCarsTableProps) {
  if (cars.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
        <p className="text-gray-400 text-sm">ยังไม่มีข้อมูลรถในระบบ</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">รถ</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ทะเบียน</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Chassis</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">สถานะ</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ลูกค้า</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">อัปเดต</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {cars.map((car) => (
              <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/cars/${car.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                    {carDisplayName(car)}
                  </Link>
                  {car.color && (
                    <span className="ml-1.5 text-xs text-gray-400">{car.color}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">{car.plate_number ?? '-'}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{car.chassis_number?.slice(-6) ?? '-'}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={car.status} />
                </td>
                <td className="px-4 py-3 text-gray-600">{car.buyer ?? '-'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(car.updated_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="sm:hidden divide-y divide-gray-100">
        {cars.map((car) => (
          <Link key={car.id} href={`/cars/${car.id}`} className="flex items-center justify-between px-4 py-3 active:bg-gray-50">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{carDisplayName(car)}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {car.plate_number ?? car.chassis_number?.slice(-8) ?? '-'}
                {car.buyer ? ` · ${car.buyer}` : ''}
              </p>
            </div>
            <div className="ml-3 flex flex-col items-end gap-1">
              <StatusBadge status={car.status} />
              <span className="text-xs text-gray-400">{formatDate(car.updated_at)}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer link */}
      <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50">
        <Link href="/cars" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
          ดูรถทั้งหมด →
        </Link>
      </div>
    </div>
  )
}
