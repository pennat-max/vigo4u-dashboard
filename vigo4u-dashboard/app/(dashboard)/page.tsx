// app/(dashboard)/page.tsx
import { createClient } from '@/lib/supabase/server'
import KpiCards from '@/components/dashboard/KpiCards'
import StatusChart from '@/components/dashboard/StatusChart'
import BrandChart from '@/components/dashboard/BrandChart'
import RecentCarsTable from '@/components/dashboard/RecentCarsTable'
import type { Car, DashboardKPIs } from '@/types/database'

export const revalidate = 60 // revalidate ทุก 1 นาที

export default async function DashboardPage() {
  const supabase = createClient()

  // ดึงข้อมูลทั้งหมดแบบ parallel
  const [allCarsResult, recentCarsResult] = await Promise.all([
    supabase
      .from('cars')
      .select('status, brand')
      .order('updated_at', { ascending: false }),
    supabase
      .from('cars')
      .select('id, brand, model, model_year, plate_number, chassis_number, status, buyer, country, updated_at, color')
      .order('updated_at', { ascending: false })
      .limit(10),
  ])

  const allCars = allCarsResult.data ?? []
  const recentCars = recentCarsResult.data ?? []

  // คำนวณ KPIs
  const kpis: DashboardKPIs = {
    total: allCars.length,
    available: allCars.filter((c) => c.status === 'available').length,
    booked: allCars.filter((c) => c.status === 'booked').length,
    shipped: allCars.filter((c) => c.status === 'shipped').length,
    doc_pending: allCars.filter((c) => c.status === 'doc_pending').length,
  }

  // สรุปตาม status
  const statusMap = allCars.reduce<Record<string, number>>((acc, car) => {
    const s = car.status ?? 'unknown'
    acc[s] = (acc[s] ?? 0) + 1
    return acc
  }, {})

  // สรุปตาม brand (top 8)
  const brandMap = allCars.reduce<Record<string, number>>((acc, car) => {
    const b = car.brand ?? 'ไม่ระบุ'
    acc[b] = (acc[b] ?? 0) + 1
    return acc
  }, {})
  const brandData = Object.entries(brandMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([brand, count]) => ({ brand, count }))

  return (
    <div className="space-y-5 pb-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">ภาพรวม</h1>
        <p className="text-sm text-gray-500 mt-0.5">สถานะรถยนต์ทั้งหมดในระบบ</p>
      </div>

      {/* KPI Cards */}
      <KpiCards kpis={kpis} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StatusChart data={statusMap} />
        <BrandChart data={brandData} />
      </div>

      {/* Recent Cars */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">อัปเดตล่าสุด</h2>
        <RecentCarsTable cars={recentCars as Car[]} />
      </div>
    </div>
  )
}
