// app/(dashboard)/cars/[id]/not-found.tsx
import Link from 'next/link'

export default function CarNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-5xl mb-4">🚗</div>
      <h2 className="text-lg font-bold text-gray-900 mb-1">ไม่พบข้อมูลรถ</h2>
      <p className="text-sm text-gray-500 mb-5">รถที่คุณค้นหาอาจถูกลบหรือไม่มีในระบบ</p>
      <Link
        href="/cars"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
      >
        กลับไปรายการรถ
      </Link>
    </div>
  )
}
