# VIGO4U Dashboard

ระบบจัดการรถยนต์ส่งออก — Next.js 14 + Supabase + TypeScript + Tailwind CSS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Charts | Recharts |

---

## โครงสร้างไฟล์

```
vigo4u-dashboard/
├── app/
│   ├── (auth)/login/           ← หน้า Login
│   ├── (dashboard)/
│   │   ├── layout.tsx          ← Sidebar + Mobile Nav
│   │   ├── page.tsx            ← Dashboard (KPI + Charts)
│   │   ├── loading.tsx         ← Skeleton loading
│   │   └── cars/
│   │       ├── page.tsx        ← รายการรถ + filter/search
│   │       ├── loading.tsx
│   │       └── [id]/
│   │           ├── page.tsx    ← รายละเอียดรถ
│   │           └── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx         ← Desktop sidebar
│   │   └── MobileNav.tsx       ← Mobile top bar + bottom tabs
│   ├── dashboard/
│   │   ├── KpiCards.tsx
│   │   ├── StatusChart.tsx     ← Pie chart
│   │   ├── BrandChart.tsx      ← Bar chart
│   │   └── RecentCarsTable.tsx
│   └── cars/
│       ├── StatusBadge.tsx
│       ├── CarsClient.tsx      ← Search/filter/table (Client)
│       └── CarDetailSections.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts           ← Browser client
│   │   ├── server.ts           ← Server client
│   │   └── middleware.ts       ← Session refresh
│   └── utils.ts                ← Formatters, STATUS_CONFIG
├── types/
│   └── database.ts             ← Car, Database, types ทั้งหมด
├── middleware.ts               ← Auth guard
├── .env.example
└── README.md
```

---

## Setup

### 1. Clone & Install

```bash
git clone <repo-url>
cd vigo4u-dashboard
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

แก้ไข `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

ดูค่าได้ที่ **Supabase Dashboard → Project Settings → API**

### 3. Supabase Table Setup

รัน SQL นี้ใน **Supabase → SQL Editor**:

```sql
-- ตาราง cars
CREATE TABLE IF NOT EXISTS public.cars (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  spec             TEXT,
  status           TEXT DEFAULT 'available',
  picture          TEXT,
  plate_number     TEXT,
  province         TEXT,
  brand            TEXT,
  drive_type       TEXT,
  engine_size      TEXT,
  grade            TEXT,
  gear_type        TEXT,
  cabin            TEXT,
  color            TEXT,
  manufacture      TEXT,
  registration     TEXT,
  engine_number    TEXT,
  chassis_number   TEXT,
  mileage          INTEGER,
  agent            TEXT,
  inspector        TEXT,
  driver_location  TEXT,
  initial_document TEXT,
  document_status  TEXT,
  doc_fee          NUMERIC,
  repair_cost      NUMERIC,
  repair_details   TEXT,
  advance          NUMERIC,
  buy_price        NUMERIC,
  total_cost       NUMERIC,
  part_accessories TEXT,
  web_price_usd    NUMERIC,
  requested_modifications TEXT,
  free             TEXT,
  booked_date      DATE,
  sale_price_usd   NUMERIC,
  buyer            TEXT,
  sale_support     TEXT,
  remarks          TEXT,
  booked_shipping  DATE,
  destination_port TEXT,
  other            TEXT,
  shipped          BOOLEAN DEFAULT false,
  country          TEXT,
  month            TEXT,
  c_year           INTEGER,
  model            TEXT,
  model_year       INTEGER,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cars_updated_at
  BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;

-- Policy: Admin เห็นทั้งหมด
-- ⚠️  ปรับ policy ตาม role จริงของคุณ
CREATE POLICY "admin_all" ON public.cars
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Index สำหรับ performance
CREATE INDEX idx_cars_status     ON public.cars(status);
CREATE INDEX idx_cars_brand      ON public.cars(brand);
CREATE INDEX idx_cars_country    ON public.cars(country);
CREATE INDEX idx_cars_updated_at ON public.cars(updated_at DESC);
CREATE INDEX idx_cars_chassis    ON public.cars(chassis_number);
CREATE INDEX idx_cars_buyer      ON public.cars(buyer);
```

### 4. Run Development

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

### 5. สร้าง User ใน Supabase

ไปที่ **Supabase → Authentication → Users → Add user**

---

## Deploy บน Vercel

```bash
npm install -g vercel
vercel
```

ใส่ environment variables ใน Vercel Dashboard เหมือน `.env.local`

---

## Access Control (RLS)

ระบบนี้วาง structure รองรับ Role-based access:

```sql
-- ตาราง profiles (optional — สำหรับ role management)
CREATE TABLE public.profiles (
  id        UUID REFERENCES auth.users(id) PRIMARY KEY,
  role      TEXT DEFAULT 'sales',     -- 'admin' | 'sales'
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Policy: sales เห็นแต่รถที่ตัวเองรับผิดชอบ
CREATE POLICY "sales_own_cars" ON public.cars
  FOR SELECT
  USING (
    sale_support = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
    OR
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );
```

---

## Status Values

| status | ความหมาย |
|--------|---------|
| `available` | พร้อมขาย |
| `booked` | จองแล้ว |
| `shipped` | ส่งออกแล้ว |
| `doc_pending` | เอกสารค้าง |
| `in_prep` | เตรียมรถ |
| `sold` | ขายแล้ว |

---

## ⚠️ จุดที่ควรตรวจสอบกับ Schema จริง

1. **`status` values** — ตรวจว่าใช้ค่าไหนจริง ปรับ `STATUS_CONFIG` ใน `lib/utils.ts`
2. **`picture` field** — เป็น URL ตรง? หรือ path ใน Supabase Storage?
3. **`manufacture` format** — เป็น DATE หรือ TEXT (ปี ค.ศ.)?
4. **`registration` format** — เป็น DATE หรือ TEXT?
5. **`booked_date`, `booked_shipping`** — เป็น DATE หรือ TIMESTAMPTZ?
6. **Currency** — `buy_price` เป็น THB จริงไหม? ปรับใน `CarDetailSections.tsx`
7. **RLS Policies** — ปรับให้ตรงกับ user roles ของบริษัทจริง

---

© 2025 VIGO4U
