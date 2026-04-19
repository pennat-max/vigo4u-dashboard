// components/cars/CarDetailSections.tsx
import type { Car } from '@/types/database'
import { formatDate, formatNumber, formatCurrency } from '@/lib/utils'

interface CarDetailSectionsProps {
  car: Car
}

// ─── Reusable sub-components ───────────────────────────────────────────────

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50">
        <span className="text-base">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{children}</div>
}

function Field({ label, value, mono = false, highlight = false }: {
  label: string
  value?: string | number | null
  mono?: boolean
  highlight?: boolean
}) {
  const display = value ?? '-'
  return (
    <div>
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className={`text-sm break-all
        ${mono ? 'font-mono' : 'font-medium'}
        ${highlight ? 'text-blue-700 font-semibold' : 'text-gray-900'}
        ${display === '-' ? 'text-gray-300 font-normal' : ''}
      `}>
        {display}
      </p>
    </div>
  )
}

function FullField({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="col-span-2 sm:col-span-3">
      <p className="text-xs text-gray-400 mb-0.5">{label}</p>
      <p className={`text-sm ${value ? 'text-gray-900' : 'text-gray-300'}`}>
        {value ?? '-'}
      </p>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function CarDetailSections({ car }: CarDetailSectionsProps) {
  return (
    <div className="space-y-3">

      {/* 1. ข้อมูลพื้นฐาน */}
      <Section title="ข้อมูลพื้นฐาน" icon="🚗">
        <Grid>
          <Field label="ยี่ห้อ" value={car.brand} />
          <Field label="รุ่น" value={car.model} />
          <Field label="ปีรุ่น" value={car.model_year} />
          <Field label="สี" value={car.color} />
          <Field label="ประเภทห้องโดยสาร" value={car.cabin} />
          <Field label="Grade" value={car.grade} />
          <Field label="ปีผลิต" value={car.manufacture ? formatDate(car.manufacture) : null} />
          <Field label="Spec" value={car.spec} />
        </Grid>
      </Section>

      {/* 2. สเปกเครื่องยนต์ */}
      <Section title="สเปก" icon="⚙️">
        <Grid>
          <Field label="เครื่องยนต์" value={car.engine_size ? `${car.engine_size}L` : null} />
          <Field label="ระบบขับเคลื่อน" value={car.drive_type} />
          <Field label="เกียร์" value={car.gear_type} />
          <Field label="ไมล์" value={car.mileage ? `${formatNumber(car.mileage)} km` : null} />
          <Field label="ทะเบียน" value={car.plate_number} mono />
          <Field label="จังหวัด" value={car.province} />
          <Field label="วันหมดทะเบียน" value={formatDate(car.registration)} />
          <Field label="เลขเครื่อง" value={car.engine_number} mono />
          <Field label="เลขถัง (Chassis)" value={car.chassis_number} mono highlight />
        </Grid>
      </Section>

      {/* 3. เอกสาร */}
      <Section title="เอกสาร" icon="📋">
        <Grid>
          <Field label="เอกสารเริ่มต้น" value={car.initial_document} />
          <Field label="สถานะเอกสาร" value={car.document_status} />
          <Field label="ค่าเอกสาร" value={car.doc_fee ? formatCurrency(car.doc_fee) : null} />
          <Field label="ผู้ตรวจสอบ" value={car.inspector} />
          <Field label="ตัวแทน" value={car.agent} />
          <Field label="ที่รับรถ" value={car.driver_location} />
        </Grid>
      </Section>

      {/* 4. ต้นทุน */}
      <Section title="ต้นทุน" icon="💰">
        <Grid>
          <Field label="ราคาซื้อ" value={car.buy_price ? formatCurrency(car.buy_price) : null} highlight />
          <Field label="ค่าซ่อม" value={car.repair_cost ? formatCurrency(car.repair_cost) : null} />
          <Field label="มัดจำ" value={car.advance ? formatCurrency(car.advance) : null} />
          <Field label="ต้นทุนรวม" value={car.total_cost ? formatCurrency(car.total_cost) : null} highlight />
          <FullField label="รายละเอียดซ่อม" value={car.repair_details} />
          <FullField label="อุปกรณ์เสริม" value={car.part_accessories} />
        </Grid>
      </Section>

      {/* 5. การขาย */}
      <Section title="การขาย" icon="🤝">
        <Grid>
          <Field label="ราคาลง Web (USD)" value={car.web_price_usd ? formatCurrency(car.web_price_usd, 'USD') : null} />
          <Field label="ราคาขาย (USD)" value={car.sale_price_usd ? formatCurrency(car.sale_price_usd, 'USD') : null} highlight />
          <Field label="วันที่จอง" value={formatDate(car.booked_date)} />
          <Field label="ลูกค้า (Buyer)" value={car.buyer} highlight />
          <Field label="ผู้รับผิดชอบ" value={car.sale_support} />
          <Field label="ของแถม" value={car.free} />
          <FullField label="ดัดแปลงตามที่ขอ" value={car.requested_modifications} />
        </Grid>
      </Section>

      {/* 6. การส่งออก */}
      <Section title="การส่งออก" icon="🚢">
        <Grid>
          <Field label="ประเทศปลายทาง" value={car.country} />
          <Field label="ท่าปลายทาง" value={car.destination_port} />
          <Field label="วันจอง Shipping" value={formatDate(car.booked_shipping)} />
          <Field
            label="Shipped"
            value={car.shipped === true ? '✅ ส่งออกแล้ว' : car.shipped === false ? '⏳ ยังไม่ส่ง' : null}
          />
          <Field label="เดือน" value={car.month} />
          <Field label="ปี" value={car.c_year} />
          <FullField label="หมายเหตุ Shipping" value={car.other} />
        </Grid>
      </Section>

      {/* 7. หมายเหตุ */}
      {car.remarks && (
        <Section title="หมายเหตุ" icon="📝">
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{car.remarks}</p>
        </Section>
      )}

      {/* 8. Timestamps */}
      <div className="flex gap-4 text-xs text-gray-400 px-1">
        <span>สร้าง: {formatDate(car.created_at)}</span>
        <span>อัปเดต: {formatDate(car.updated_at)}</span>
      </div>
    </div>
  )
}
