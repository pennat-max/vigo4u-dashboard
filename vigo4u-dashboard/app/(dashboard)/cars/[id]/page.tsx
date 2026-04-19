// app/(dashboard)/cars/[id]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Car } from '@/types/database'
import StatusBadge from '@/components/cars/StatusBadge'
import CarDetailSections from '@/components/cars/CarDetailSections'

interface PageProps {
  params: { id: string }
}

export default async function CarDetailPage({ params }: PageProps) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !data) notFound()

  const car = data as Car

  const displayName = [car.brand, car.model, car.model_year ? `(${car.model_year})` : null]
    .filter(Boolean)
    .join(' ') || 'ไม่ระบุ'

  return (
    <div className="space-y-4 pb-8">
      {/* Back + Header */}
      <div>
        <Link href="/cars" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          รายการรถ
        </Link>

        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {[car.plate_number, car.chassis_number].filter(Boolean).join(' · ') || 'ไม่มีทะเบียน / Chassis'}
            </p>
          </div>
          <StatusBadge status={car.status} size="md" />
        </div>
      </div>

      {/* Picture */}
      {car.picture && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={car.picture}
            alt={displayName}
            className="w-full max-h-72 object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}

      {/* Detail Sections */}
      <CarDetailSections car={car} />
    </div>
  )
}
