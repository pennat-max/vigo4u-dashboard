// lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CarStatus } from '@/types/database'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | null, currency: 'THB' | 'USD' = 'THB'): string {
  if (amount == null) return '-'
  const formatter = new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  return formatter.format(amount)
}

export function formatNumber(n: number | null): string {
  if (n == null) return '-'
  return new Intl.NumberFormat('th-TH').format(n)
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  try {
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export function formatDateShort(dateStr: string | null): string {
  if (!dateStr) return '-'
  try {
    return new Intl.DateTimeFormat('th-TH', {
      month: 'short',
      day: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export const STATUS_CONFIG: Record<CarStatus, { label: string; color: string; bg: string; dot: string }> = {
  available:   { label: 'พร้อมขาย',     color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200',   dot: 'bg-emerald-500' },
  booked:      { label: 'จองแล้ว',      color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200',       dot: 'bg-amber-500' },
  shipped:     { label: 'ส่งออกแล้ว',   color: 'text-blue-700',    bg: 'bg-blue-50 border-blue-200',         dot: 'bg-blue-500' },
  doc_pending: { label: 'เอกสารค้าง',   color: 'text-red-700',     bg: 'bg-red-50 border-red-200',           dot: 'bg-red-500' },
  in_prep:     { label: 'เตรียมรถ',     color: 'text-purple-700',  bg: 'bg-purple-50 border-purple-200',     dot: 'bg-purple-500' },
  sold:        { label: 'ขายแล้ว',      color: 'text-slate-700',   bg: 'bg-slate-50 border-slate-200',       dot: 'bg-slate-500' },
}

export function getStatusConfig(status: string | null) {
  if (!status) return { label: 'ไม่ระบุ', color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200', dot: 'bg-slate-400' }
  return STATUS_CONFIG[status as CarStatus] ?? { label: status, color: 'text-slate-500', bg: 'bg-slate-50 border-slate-200', dot: 'bg-slate-400' }
}

export const STATUS_CHART_COLORS: Record<string, string> = {
  available:   '#10b981',
  booked:      '#f59e0b',
  shipped:     '#3b82f6',
  doc_pending: '#ef4444',
  in_prep:     '#8b5cf6',
  sold:        '#64748b',
}

export function carDisplayName(car: { brand?: string | null; model?: string | null; model_year?: number | null }): string {
  const parts = [car.brand, car.model, car.model_year ? `(${car.model_year})` : null].filter(Boolean)
  return parts.join(' ') || 'ไม่ระบุ'
}
