'use client'
// components/cars/CarsClient.tsx

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { Car, CarStatus } from '@/types/database'
import { formatDate, formatNumber, formatCurrency, getStatusConfig, carDisplayName, cn } from '@/lib/utils'
import StatusBadge from './StatusBadge'

interface CarsClientProps {
  cars: Car[]
  brands: string[]
  countries: string[]
  initialSearch: string
  error?: string
}

const STATUS_OPTIONS: { value: CarStatus | 'all'; label: string }[] = [
  { value: 'all',         label: 'ทุกสถานะ' },
  { value: 'available',  label: 'พร้อมขาย' },
  { value: 'booked',     label: 'จองแล้ว' },
  { value: 'shipped',    label: 'ส่งออกแล้ว' },
  { value: 'doc_pending',label: 'เอกสารค้าง' },
  { value: 'in_prep',    label: 'เตรียมรถ' },
  { value: 'sold',       label: 'ขายแล้ว' },
]

export default function CarsClient({ cars, brands, countries, initialSearch, error }: CarsClientProps) {
  const [search, setSearch] = useState(initialSearch)
  const [status, setStatus] = useState<CarStatus | 'all'>('all')
  const [brand, setBrand] = useState('all')
  const [country, setCountry] = useState('all')
  const [shipped, setShipped] = useState<'all' | 'yes' | 'no'>('all')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return cars.filter((car) => {
      // Search
      if (q) {
        const haystack = [
          car.chassis_number,
          car.plate_number,
          car.brand,
          car.model,
          car.buyer,
          car.country,
        ].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      // Status
      if (status !== 'all' && car.status !== status) return false
      // Brand
      if (brand !== 'all' && car.brand?.toLowerCase() !== brand.toLowerCase()) return false
      // Country
      if (country !== 'all' && car.country?.toLowerCase() !== country.toLowerCase()) return false
      // Shipped
      if (shipped === 'yes' && !car.shipped) return false
      if (shipped === 'no' && car.shipped) return false
      return true
    })
  }, [cars, search, status, brand, country, shipped])

  const hasFilters = search || status !== 'all' || brand !== 'all' || country !== 'all' || shipped !== 'all'

  function clearFilters() {
    setSearch('')
    setStatus('all')
    setBrand('all')
    setCountry('all')
    setShipped('all')
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
        เกิดข้อผิดพลาด: {error}
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">รายการรถ</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {filtered.length !== cars.length
              ? `${filtered.length} จาก ${cars.length} คัน`
              : `ทั้งหมด ${cars.length} คัน`}
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 space-y-2.5">
        {/* Search bar */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหา chassis, ทะเบียน, ยี่ห้อ, ลูกค้า..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter row */}
        <div className="flex gap-2 flex-wrap">
          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CarStatus | 'all')}
            className="flex-1 min-w-[120px] px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Brand */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="flex-1 min-w-[100px] px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทุกยี่ห้อ</option>
            {brands.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>

          {/* Country */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="flex-1 min-w-[100px] px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทุกประเทศ</option>
            {countries.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Shipped */}
          <select
            value={shipped}
            onChange={(e) => setShipped(e.target.value as 'all' | 'yes' | 'no')}
            className="flex-1 min-w-[90px] px-2.5 py-1.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Shipped ทั้งหมด</option>
            <option value="yes">Shipped แล้ว</option>
            <option value="no">ยังไม่ Shipped</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition"
            >
              ล้าง
            </button>
          )}
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} onClear={clearFilters} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">รถ</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ทะเบียน / Chassis</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">สเปก</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ไมล์</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">สถานะ</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ลูกค้า / ประเทศ</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">ราคา USD</th>
                  <th className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">อัปเดต</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((car) => (
                  <tr key={car.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link href={`/cars/${car.id}`} className="font-medium text-blue-600 hover:text-blue-700 block">
                        {carDisplayName(car)}
                      </Link>
                      <span className="text-xs text-gray-400">{[car.color, car.cabin].filter(Boolean).join(' · ')}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-mono text-xs text-gray-700">{car.plate_number ?? '-'}</p>
                      <p className="font-mono text-xs text-gray-400">{car.chassis_number ? `…${car.chassis_number.slice(-8)}` : '-'}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">
                      <p>{[car.engine_size ? car.engine_size+'L' : null, car.drive_type, car.gear_type].filter(Boolean).join(' / ')}</p>
                      <p className="text-gray-400">{car.grade ?? ''}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{car.mileage ? formatNumber(car.mileage) + ' km' : '-'}</td>
                    <td className="px-4 py-3"><StatusBadge status={car.status} /></td>
                    <td className="px-4 py-3">
                      <p className="text-gray-700">{car.buyer ?? '-'}</p>
                      <p className="text-xs text-gray-400">{car.country ?? ''}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">
                      {car.sale_price_usd
                        ? formatCurrency(car.sale_price_usd, 'USD')
                        : car.web_price_usd
                        ? <span className="text-gray-400">{formatCurrency(car.web_price_usd, 'USD')}</span>
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{formatDate(car.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Cards - Mobile */}
      <div className="sm:hidden space-y-2">
        {filtered.length === 0 ? (
          <EmptyState hasFilters={!!hasFilters} onClear={clearFilters} />
        ) : (
          filtered.map((car) => <MobileCarCard key={car.id} car={car} />)
        )}
      </div>
    </div>
  )
}

function MobileCarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="block bg-white rounded-xl border border-gray-200 shadow-sm p-4 active:bg-gray-50 transition"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 text-sm truncate">{carDisplayName(car)}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {[car.color, car.cabin, car.drive_type].filter(Boolean).join(' · ')}
          </p>
        </div>
        <StatusBadge status={car.status} />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <div>
          <span className="text-gray-400">ทะเบียน </span>
          <span className="font-mono text-gray-700">{car.plate_number ?? '-'}</span>
        </div>
        <div>
          <span className="text-gray-400">ไมล์ </span>
          <span className="text-gray-700">{car.mileage ? formatNumber(car.mileage) + ' km' : '-'}</span>
        </div>
        {car.buyer && (
          <div className="col-span-2">
            <span className="text-gray-400">ลูกค้า </span>
            <span className="text-gray-700">{car.buyer}</span>
            {car.country && <span className="text-gray-400"> · {car.country}</span>}
          </div>
        )}
        {(car.sale_price_usd || car.web_price_usd) && (
          <div>
            <span className="text-gray-400">ราคา </span>
            <span className="font-medium text-gray-900">
              {formatCurrency(car.sale_price_usd ?? car.web_price_usd, 'USD')}
            </span>
          </div>
        )}
        <div className="text-gray-400">{formatDate(car.updated_at)}</div>
      </div>
    </Link>
  )
}

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-10 text-center shadow-sm">
      <div className="text-3xl mb-2">🔍</div>
      <p className="text-gray-500 text-sm font-medium">
        {hasFilters ? 'ไม่พบรถที่ตรงกับเงื่อนไข' : 'ยังไม่มีข้อมูลรถ'}
      </p>
      {hasFilters && (
        <button onClick={onClear} className="mt-3 text-xs text-blue-600 hover:underline">
          ล้างตัวกรองทั้งหมด
        </button>
      )}
    </div>
  )
}
