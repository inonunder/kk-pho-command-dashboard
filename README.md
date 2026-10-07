# KK-PHO EXECUTIVE COMMAND & TRACKING DASHBOARD
### ศูนย์บริหารข้อสั่งการและติดตามงาน หลังเกษียณหนังสือ นพ.สสจ.
**สำนักงานสาธารณสุขจังหวัดขอนแก่น (Khon Kaen Provincial Public Health Office)**

> *“ทุกหนังสือ คือ ข้อสั่งการ ทุกข้อสั่งการ คือ งาน ทุกงาน คือ ผลลัพธ์ของประชาชน”*

---

## 🏛️ ภาพรวมระบบ (System Overview)

Web Application ระดับองค์กรสำหรับสำนักงานสาธารณสุขจังหวัดขอนแก่น เพื่อบริหารจัดการและติดตามข้อสั่งการหลังการเกษียณหนังสือราชการของ นายแพทย์สาธารณสุขจังหวัดขอนแก่น (นพ.สสจ.) อย่างเป็นรูปธรรม โปร่งใส และรวดเร็ว

### 🎯 วงจรการดำเนินงาน (End-to-End Workflow & Traceability)
```
หนังสือราชการ (PDF) ➔ ข้อสั่งการ นพ.สสจ. ➔ แตกเป็นงานย่อย (Tasks) ➔ จำแนก 4 ขางาน 
➔ มอบหมายผู้รับผิดชอบ ➔ กำหนด Deadline ➔ Work Tracking ➔ Calendar ➔ Risk Engine 
➔ รายงานความคืบหน้า ➔ แนบหลักฐาน ➔ ปิดงาน ➔ สรุปผู้บริหาร (Executive AI Brief)
```

---

## 🌟 จุดเด่นและฟังก์ชันหลัก (Core Features)

1. **Executive Command Dashboard (หน้าหลัก)**
   - **Executive KPI Cards**: หนังสือเข้า (48 ฉบับ), ข้อสั่งการ (128 รายการ), กำลังดำเนินการ (27 รายการ), ใกล้ครบกำหนด (12 รายการ), เกินกำหนด (7 รายการ), ปิดงานแล้ว (94 รายการ คิดเป็น 73.4%)
   - **4 ขางานหลัก**: แผนงาน/โครงการ, งบประมาณ, นิเทศติดตาม, ข้อมูล พร้อมระบบ Drill-down
   - **ปฏิทินกลาง (Central Calendar)**: แสดงนัดหมาย ประชุม นิเทศงาน และส่งมอบงานประจำวัน
   - **Risk Engine Widget**: จำแนกความเสี่ยง 4 ระดับ (Critical, High, Medium, Normal) พร้อมระบบแจ้งเตือนประเด็นที่ต้องสั่งการ
   - **รายงานผ่าน LINE (LINE Daily Command)**: พรีวิวรายงานตอนเช้า 06:00 น. (Daily Brief) และตอนเย็น 18:00 น. (Closing Report) ผ่าน Smartphone Interface

2. **รับหนังสือราชการ & วิเคราะห์ AI (Document Intake & AI OCR)**
   - Upload หนังสือราชการ (PDF, JPG, PNG, DOCX)
   - สกัดข้อสั่งการ วันที่ครบกำหนด และจำแนก 4 ขางานอัตโนมัติด้วย AI
   - หลักการ **"AI Suggest ➔ Human Confirm"** ป้องกันความผิดพลาด

3. **ระบบติดตามงาน (Central Work Tracking)**
   - สลับมุมมองได้ทั้งแบบ **ตาราง (Data Table)** พร้อมระบบค้นหา ฟิลเตอร์ละเอียด และส่งออก Excel/CSV
   - มุมมอง **Kanban Board** แยกตามสถานะ: *รอรับเรื่อง, รับเรื่องแล้ว, ดำเนินการ, รอข้อมูล, ติดปัญหา, เสร็จแล้ว*
   - Drawer รายละเอียดงานพร้อมระบบ **Traceability** ย้อนรอยกลับไปยังหนังสือต้นฉบับได้ 100%

4. **การรายงานผลและจัดเก็บหลักฐาน (Evidence Management)**
   - เจ้าหน้าที่สามารถอัปเดต % ความคืบหน้า บันทึกปัญหา/อุปสรรค (Blocker)
   - แนบไฟล์หลักฐานผลการปฏิบัติราชการ (PDF, Excel, Word, ภาพถ่าย)
   - บันทึกประวัติการดำเนินงาน (Activity Timeline) แบบละเอียด

5. **ศูนย์รายงานราชการ 10 ฉบับ (Official Report Center)**
   - รายงานข้อสั่งการ, รายงานตาม 4 ขางาน, รายงานตามกลุ่มงาน, รายงานรายบุคคล, รายงานเกินกำหนด, รายงานความก้าวหน้ารอบเดือน ฯลฯ พร้อมปุ่ม Print และ Export Excel/CSV

6. **ระบบสิทธิ์ผู้ใช้งาน (Role-Based Access Control - RBAC)**
   - SUPER ADMIN, EXECUTIVE (นพ.สสจ.), WORKSTREAM MANAGER, SUPERVISOR, STAFF

---

## 💻 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (Executive Navy, Teal, Muted Gold palette)
- **Icons**: Lucide Icons
- **Fonts**: IBM Plex Sans Thai, Sarabun (Google Fonts)
- **Data Architecture**: Abstracted Storage Service (LocalStorage persistence with seed database)
- **AI & Integrations**: AI OCR & Executive Summarizer abstraction, LINE Messaging API simulation

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Local Development)

### ความต้องการขั้นต่ำ:
- Node.js version 18 หรือใหม่กว่า
- npm หรือ yarn

### คำสั่งรัน:
```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รันโหมด Development (Hot Reload)
npm run dev
```
เปิดบราวเซอร์ไปที่ `http://localhost:5173`

### คำสั่งทดสอบ Build สำหรับ Production:
```bash
npm run build
npm run preview
```

---

## 🏢 วิธีนำโปรเจกต์ไปเปิดใช้งานต่อที่คอมพิวเตอร์สำนักงานวันพรุ่งนี้

### สำหรับเครื่องที่บ้านตอนนี้ (Push ขึ้น GitHub):
1. สร้าง New Repository บน [GitHub](https://github.com/new) เช่นชื่อ `kk-pho-dashboard`
2. รันคำสั่งเชื่อมต่อไปยัง Remote Repository:
   ```bash
   git add .
   git commit -m "feat: complete KK-PHO Executive Command & Tracking Dashboard v1.0"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

### สำหรับเครื่องสำนักงานวันพรุ่งนี้ (Clone & Run):
1. เปิด Terminal ในคอมฯ สำนักงาน แล้ว Clone โค้ด:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. ติดตั้งโมดูลและรันระบบ:
   ```bash
   npm install
   npm run dev
   ```
3. พร้อมใช้งานและพัฒนาต่อยอดได้ทันที!
