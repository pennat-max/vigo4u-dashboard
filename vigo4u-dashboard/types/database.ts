// types/database.ts
// Generated from Supabase cars table schema
// ⚠️ ตรวจสอบและ adjust ตาม schema จริงใน Supabase

export type CarStatus =
  | 'available'      // พร้อมขาย
  | 'booked'         // จองแล้ว
  | 'shipped'        // ส่งออกแล้ว
  | 'doc_pending'    // เอกสารค้าง
  | 'in_prep'        // กำลังเตรียม
  | 'sold'           // ขายแล้ว

export type DocumentStatus =
  | 'complete'
  | 'pending'
  | 'missing'
  | 'processing'

export interface Car {
  id: string
  // ข้อมูลพื้นฐาน
  brand: string | null
  model: string | null
  model_year: number | null
  manufacture: string | null           // ปีผลิต (YYYY-MM-DD หรือ YYYY)
  color: string | null
  grade: string | null
  cabin: string | null                 // ประเภทห้องโดยสาร Single/Extra/Double

  // สเปก
  spec: string | null
  engine_size: string | null           // e.g. "2.4", "2.8"
  drive_type: string | null            // 4WD, 2WD
  gear_type: string | null             // MT, AT
  mileage: number | null               // km

  // ทะเบียน
  plate_number: string | null
  province: string | null
  registration: string | null          // วันหมดอายุ
  engine_number: string | null
  chassis_number: string | null

  // เอกสาร
  initial_document: string | null      // เอกสารเริ่มต้น
  document_status: DocumentStatus | null
  doc_fee: number | null

  // การจัดการ
  agent: string | null
  inspector: string | null
  driver_location: string | null

  // ต้นทุน
  repair_cost: number | null
  repair_details: string | null
  advance: number | null               // เงินมัดจำ
  buy_price: number | null             // ราคาซื้อ (THB)
  total_cost: number | null            // ต้นทุนรวม (THB)
  part_accessories: string | null

  // การขาย
  status: CarStatus
  web_price_usd: number | null         // ราคาลง web (USD)
  requested_modifications: string | null
  free: string | null                  // ของแถม
  booked_date: string | null           // วันที่จอง
  sale_price_usd: number | null        // ราคาขาย (USD)
  buyer: string | null
  sale_support: string | null          // ผู้รับผิดชอบขาย

  // การส่งออก
  booked_shipping: string | null       // วันที่จอง shipping
  destination_port: string | null
  country: string | null
  shipped: boolean | null
  other: string | null
  month: string | null                 // เดือนที่ขาย
  c_year: number | null                // ปีที่ขาย

  // อื่นๆ
  picture: string | null               // URL หรือ path รูป
  remarks: string | null

  // Timestamps
  created_at: string
  updated_at: string
}

// สำหรับ Supabase response type
export interface Database {
  public: {
    Tables: {
      cars: {
        Row: Car
        Insert: Omit<Car, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Car, 'id' | 'created_at' | 'updated_at'>>
        Relationships: []
      }
    }
  }
}

// User profile type
export interface UserProfile {
  id: string
  email: string
  role: 'admin' | 'sales'
  full_name: string | null
  created_at: string
}

// KPI summary type
export interface DashboardKPIs {
  total: number
  available: number
  booked: number
  shipped: number
  doc_pending: number
}

// Chart data types
export interface StatusChartData {
  status: string
  count: number
  fill: string
}

export interface BrandChartData {
  brand: string
  count: number
}

// Filter types for cars page
export interface CarFilters {
  search: string
  status: CarStatus | 'all'
  brand: string
  country: string
  shipped: 'all' | 'yes' | 'no'
}
