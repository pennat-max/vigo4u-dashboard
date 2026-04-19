// app/(dashboard)/cars/page.tsx
import { createClient } from '@/lib/supabase/server'
import CarsClient from '@/components/cars/CarsClient'
import type { Car, CarStatus } from '@/types/database'

export const revalidate = 30

interface PageProps {
  searchParams: {
    q?: string
    status?: string
    brand?: string
    country?: string
    shipped?: string
  }
}

export default async function CarsPage({ searchParams }: PageProps) {
  const supabase = createClient()

  // Base query
  let query = supabase
    .from('cars')
    .select(
      'id, brand, model, model_year, plate_number, chassis_number, status, buyer, country, shipped, color, mileage, web_price_usd, sale_price_usd, updated_at, grade, cabin, drive_type, gear_type, engine_size, sale_support, booked_date'
    )
    .order('updated_at', { ascending: false })

  // Server-side filters
  if (searchParams.status && searchParams.status !== 'all') {
    query = query.eq('status', searchParams.status as CarStatus)
  }
  if (searchParams.brand && searchParams.brand !== 'all') {
    query = query.ilike('brand', `%${searchParams.brand}%`)
  }
  if (searchParams.country && searchParams.country !== 'all') {
    query = query.ilike('country', `%${searchParams.country}%`)
  }
  if (searchParams.shipped === 'yes') {
    query = query.eq('shipped', true)
  } else if (searchParams.shipped === 'no') {
    query = query.eq('shipped', false)
  }

  const { data, error } = await query.limit(500)

  // ดึง distinct brands + countries สำหรับ filter dropdown
  const { data: brandRows } = await supabase
    .from('cars')
    .select('brand')
    .not('brand', 'is', null)
    .order('brand')

  const { data: countryRows } = await supabase
    .from('cars')
    .select('country')
    .not('country', 'is', null)
    .order('country')

  const brands = [...new Set(brandRows?.map((r) => r.brand).filter(Boolean) ?? [])] as string[]
  const countries = [...new Set(countryRows?.map((r) => r.country).filter(Boolean) ?? [])] as string[]

  return (
    <CarsClient
      cars={(data ?? []) as Car[]}
      brands={brands}
      countries={countries}
      initialSearch={searchParams.q ?? ''}
      error={error?.message}
    />
  )
}
