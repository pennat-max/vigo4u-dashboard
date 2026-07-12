# MASTER MISSION: TONY AI Platform Foundation

ใช้คำสั่งนี้กับ Codex ใน repository `pennat-max/vigo4u-dashboard`

คุณคือ Lead Software Engineer ของโครงการ VIGO4U OS / TONY AI Platform ให้ทำงานต่อเนื่องจนจบภารกิจที่ไม่ติด Blocker จริง โดยถือ GitHub เป็นแหล่งข้อมูลถาวร และห้ามสร้างโปรเจกต์ใหม่แยกจาก repository เดิม

## เป้าหมาย

ออกแบบและเตรียมฐานระบบ TONY AI Platform แบบ Production-ready โดย LINE เป็นช่องทางแรก รองรับหลายบริษัท หลายผู้ใช้ หลาย Skill และ Workflow ธุรกิจจริง เริ่มจากธุรกิจซื้อ–ขาย–ส่งออกรถมือสองของ VIGO4U

## เอกสารบังคับอ่าน

อ่านเอกสารทั้งหมดใน `docs/tony-ai/` โดยเฉพาะ:

- `START-HERE.md`
- `ARCHITECTURE.md`
- `ROADMAP.md`
- `RECORD_2026_AUDIT.md`

อ่าน handoff/task/architecture เดิมทั้งหมด และตรวจ code/schema ปัจจุบันก่อนแก้ไข

## กฎสถาปัตยกรรม

1. UI → Service → Repository → Data Source
2. Business Logic ห้ามอ่าน Google Sheets โดยตรง
3. ใช้ Repository Interface เพื่อเปลี่ยน Google Sheets เป็น PostgreSQL ได้
4. ห้ามใช้เลขแถว Spreadsheet เป็น Business ID
5. Google Sheets Repository ต้องหา Column ด้วย Header Mapping เท่านั้น
6. ทุกตารางธุรกิจใช้ Stable ID และ `company_id`
7. AI ห้ามเขียนฐานข้อมูลหรือ Sheet โดยตรง ต้องผ่าน Tool Gateway และ Service
8. งานเสี่ยง การเงิน และอนุมัติซื้อ ต้องมี Permission, Human Approval และ Audit Log
9. Mobile First; ใช้ Queue, Card, Form, Detail Page และปุ่มขนาดใหญ่ ห้ามลอก Spreadsheet UI
10. ทุก Mission ต้องมี Test Cases, Manual QA, Known Risks, Deployment Notes และ Rollback

## ขอบเขต Mission นี้

Mission นี้เป็น Foundation และ Safe Scaffold เท่านั้น ห้ามเปิด Production write workflow และห้ามแก้ข้อมูลจริง

ให้ทำ:

1. ตรวจ repository และสร้าง `IMPLEMENTATION_READINESS.md` เปรียบเทียบ Current State กับ Blueprint
2. สร้างหรืออัปเดต Project Brain: START-HERE, CURRENT_STATUS, ROADMAP, MISSIONS, PROJECT_BRAIN, ARCHITECTURE, QA, DEPLOYMENT
3. สร้าง ADR สำหรับ:
   - Source of Truth Transition
   - Repository Abstraction
   - Multi-tenant/RLS
   - LINE Event Ingestion/Idempotency
   - Workflow Engine
   - AI Skill/Tool Safety
   - Audit/Usage Billing
4. สร้าง TypeScript Domain Types/Interfaces สำหรับ Foundation โดยไม่ผูก UI กับ Supabase หรือ Google Sheets
5. สร้าง Repository Contracts และ Mock/In-memory Implementations สำหรับทดสอบ
6. สร้าง Migration Plan และ SQL Migration Drafts สำหรับ:
   - companies/users/company_members/roles/permissions
   - channel_accounts/channel_groups/channel_identities
   - messages/events/attachments/extracted_facts
   - workflow_definitions/workflow_instances/tasks/approvals
   - skills/skill_versions/company_skills
   - audit_events/usage_events/integration_sync_records
7. ห้าม Apply Migration ไป Production โดยอัตโนมัติ
8. สร้าง Test Plan และ Tests สำหรับ Permission Policy, Workflow State Transition, Idempotency, Sheet Header Mapping และ No Row-number Business ID
9. สร้าง Feature Flags โดยค่าเริ่มต้นที่มีผลต่อข้อมูลจริงต้อง OFF:
   - `line_ingestion`
   - `shadow_capture`
   - `mention_reply`
   - `workflow_write`
   - `proactive_alerts`
   - `sheet_writeback`
10. สร้าง Data Migration/Sync Design สำหรับ `Record 2026` แบบ One-way Dry-run ก่อน โดยรักษา `row_id` เป็น `source_row_id`
11. สร้าง QA, Security, Deployment และ Rollback Notes

## ข้อห้าม

- ห้ามลบหรือแก้ข้อมูลจริง
- ห้ามเปิด Two-way Sync
- ห้ามให้ AI อนุมัติซื้อหรือจ่ายเงิน
- ห้าม Hard-code Column Number
- ห้ามสร้าง Giant Prompt รวมทุก Skill
- ห้ามใส่ Secret ใน Repository
- ห้ามเปลี่ยน Production Behavior โดยไม่ใช้ Feature Flag
- ห้ามข้าม Tests, QA หรือ Docs
- ห้ามใช้ชื่อคนหรือข้อความใน LINE เป็นหลักฐานสิทธิ์ ต้องตรวจ Identity จริง

## วิธีทำงาน

ทำตามลำดับ:

Understand → Design → Review → Implement → Test → Refactor → Document → Build

เมื่อจบแต่ละส่วนให้ตรวจ Diff และทดสอบทันที หาก Code เดิมขัดกับ Blueprint ให้รักษา Backward Compatibility และบันทึก ADR/Known Risk

## Definition of Done

- Build ผ่าน
- Tests ที่เพิ่มผ่าน
- ไม่มี Production write behavior เปิดเอง
- Docs และ Project Brain อัปเดตครบ
- Migration เป็น Draft/Reviewable เท่านั้น
- Repository Contracts ไม่ผูก Business Logic กับ Sheets/Supabase
- มี PR Summary, QA Notes, Risks, Deployment และ Rollback Notes
- เปิด Draft PR พร้อม Checklist และรายการ Credential/Approval ที่ยังเป็น Blocker

ทำงานต่อเนื่องให้มากที่สุดจนติดเฉพาะ Blocker จริง ได้แก่ Credential, External Permission, Production Migration Approval หรือ Deployment Approval
