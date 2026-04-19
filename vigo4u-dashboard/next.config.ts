// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // เพิ่ม domain ของรูปรถที่ใช้จริง
      // ตัวอย่าง: Supabase Storage
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
    ],
  },
  // ⚠️ ลบบรรทัดนี้ถ้าไม่ได้ใช้ standalone mode (สำหรับ Docker/VPS)
  // output: 'standalone',
}

export default nextConfig
