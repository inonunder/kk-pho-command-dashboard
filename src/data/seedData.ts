import { User, WorkstreamInfo, Task, Order, Document, CalendarEvent, SystemNotification, SystemSettings } from '../types';

export const CURRENT_DATE = '2026-10-07'; // 7 ตุลาคม 2569 as shown in mockup
export const CURRENT_DATE_THAI = '7 ตุลาคม 2569';
export const CURRENT_TIME = '08:45';

export const WORKSTREAMS: WorkstreamInfo[] = [
  {
    id: 'plan',
    code: '01',
    name: 'แผนงานและโครงการ',
    fullName: 'งานในสายแผนงานและโครงการ',
    description: 'ยุทธศาสตร์ แผนปฏิบัติราชการ โครงการพระราชดำริ และโครงการสำคัญ',
    color: '#2563eb',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    tags: ['แผนงาน', 'โครงการ', 'ตัวชี้วัด / Action Plan', 'การจัดทำแผน / รายงานผล']
  },
  {
    id: 'budget',
    code: '02',
    name: 'งบประมาณ',
    fullName: 'งานในสายงบประมาณ',
    description: 'การจัดสรร บริหารงบประมาณ การเบิกจ่าย พัสดุ และกันเงินข้ามปี',
    color: '#16a34a',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    tags: ['งบประมาณ / จัดสรร', 'การเบิกจ่าย / PO', 'กันเงิน / โอนเปลี่ยนแปลง', 'รายงานผลการเบิกจ่าย']
  },
  {
    id: 'supervision',
    code: '03',
    name: 'นิเทศติดตาม',
    fullName: 'งานในสายนิเทศติดตาม',
    description: 'การนิเทศงานตรวจราชการ สสอ. โรงพยาบาล รพ.สต. และประเมินผล',
    color: '#d97706',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    tags: ['แผนนิเทศ / จังหวัด / CUP', 'โรงพยาบาล / สสอ.', 'ประเมินตรวจราชการ', 'ข้อเสนอแนะ / แก้ไขหลังนิเทศ']
  },
  {
    id: 'data',
    code: '04',
    name: 'ข้อมูล',
    fullName: 'งานในสายข้อมูล',
    description: 'สารสนเทศสุขภาพ ระบบ HDC, Dashboard, KPI และ Big Data ขอนแก่น',
    color: '#9333ea',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    tags: ['ข้อมูลสุขภาพ / Data Request', 'Dashboard / รายงาน', 'KPI / สั่งการกลาง', 'วิเคราะห์ข้อมูล']
  }
];

export const USERS: User[] = [
  {
    id: 'u-1',
    name: 'นพ.อภิชัย ลิมานนท์',
    position: 'นายแพทย์สาธารณสุขจังหวัดขอนแก่น',
    department: 'ผู้บริหารระดับสูง',
    role: 'EXECUTIVE',
    email: 'pmo.khonkaen@moph.go.th',
    phone: '043-221122'
  },
  {
    id: 'u-2',
    name: 'นายสมชาย บุญชู',
    position: 'นักวิชาการสาธารณสุขชำนาญการพิเศษ',
    department: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
    role: 'WORKSTREAM_MANAGER',
    email: 'somchai.b@kkpho.go.th',
    phone: '081-2345678'
  },
  {
    id: 'u-3',
    name: 'นางสาวจุฬารัตน์ วงศ์คำ',
    position: 'นักวิเคราะห์นโยบายและแผนชำนาญการ',
    department: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
    role: 'SUPERVISOR',
    email: 'chularat.w@kkpho.go.th',
    phone: '082-3456789'
  },
  {
    id: 'u-4',
    name: 'นายยิ่งยศ ศรีมงคล',
    position: 'นักวิชาการเงินและบัญชีชำนาญการ',
    department: 'กลุ่มงานบริหารทั่วไป (การเงิน)',
    role: 'STAFF',
    email: 'yingyot.s@kkpho.go.th',
    phone: '083-4567890'
  },
  {
    id: 'u-5',
    name: 'นางสาวกนกวรรณ จันทร์เพ็ญ',
    position: 'นักวิชาการคอมพิวเตอร์ปฏิบัติการ',
    department: 'กลุ่มงานเทคโนโลยีสารสนเทศและข้อมูล',
    role: 'STAFF',
    email: 'kanokwan.j@kkpho.go.th',
    phone: '084-5678901'
  },
  {
    id: 'u-admin',
    name: 'ผู้ดูแลระบบกลาง (Super Admin)',
    position: 'หัวหน้าศูนย์เทคโนโลยีสารสนเทศ',
    department: 'ศูนย์เทคโนโลยีสารสนเทศ',
    role: 'SUPER_ADMIN',
    email: 'admin@kkpho.go.th',
    phone: '043-221122 ต่อ 104'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  officeNameTh: 'สำนักงานสาธารณสุขจังหวัดขอนแก่น',
  officeNameEn: 'Khon Kaen Provincial Public Health Office',
  fiscalYear: 2570,
  riskThresholds: {
    criticalOverdue: true,
    highDaysLeft: 2,
    mediumDaysLeftMin: 3,
    mediumDaysLeftMax: 7,
    normalDaysLeft: 8
  },
  lineNotificationEnabled: true,
  aiAutoSuggestEnabled: true
};

export const INITIAL_DOCUMENTS: Document[] = [
  {
    id: 'doc-001',
    docNo: 'สธ 0208.04/ว 2541',
    date: '2026-09-28',
    receivedDate: '2026-09-29',
    title: 'โครงการพัฒนาระบบสุขภาพปฐมภูมิและการถ่ายโอนสอน.ประจำปีงบประมาณ พ.ศ. 2570',
    sender: 'สำนักงานปลัดกระทรวงสาธารณสุข',
    receiver: 'นพ.สสจ.ขอนแก่น',
    commandNote: 'มอบกลุ่มงานยุทธศาสตร์ร่วมกับกลุ่มงานปฐมภูมิ จัดทำแผนปฏิบัติการและเสนอของบประมาณภายใน 15 ต.ค. 69',
    commandDate: '2026-09-30',
    commander: 'นพ.อภิชัย ลิมานนท์ (นพ.สสจ.ขอนแก่น)',
    urgency: 'ด่วนมาก',
    secretLevel: 'ปกติ',
    fileName: 'MOPH_PrimaryCare_Transfer_2570.pdf',
    fileSize: '3.4 MB',
    pageCount: 14,
    status: 'TASKS_CREATED',
    aiAnalysis: {
      confidence: 96,
      extractedOrders: [
        'จัดทำแผนปฏิบัติการพัฒนาระบบสุขภาพปฐมภูมิ',
        'สำรวจความพร้อมการจัดสรรงบประมาณสนับสนุน รพ.สต.',
        'เตรียมการนิเทศติดตามการถ่ายโอนภารกิจ'
      ],
      suggestedWorkstream: 'plan',
      suggestedAssignee: 'นายสมชาย บุญชู',
      suggestedDeadline: '2026-10-15',
      summary: 'หนังสือจาก สป.สธ. สั่งการให้จังหวัดขอนแก่นเตรียมความพร้อมจัดทำแผนปฐมภูมิและงบประมาณปี 2570'
    }
  },
  {
    id: 'doc-002',
    docNo: 'สธ 0312/ว 1420',
    date: '2026-09-20',
    receivedDate: '2026-09-22',
    title: 'รายงานเร่งรัดการเบิกจ่ายงบลงทุนและงบดำเนินงาน ไตรมาส 4 ปี 2569',
    sender: 'กรมบัญชีกลาง / กระทรวงสาธารณสุข',
    receiver: 'นพ.สสจ.ขอนแก่น',
    commandNote: 'ให้กลุ่มงานการเงินและพัสดุเร่งรัดและรายงานผลการเบิกจ่ายงบประมาณที่ยังค้างท่อ ด่วนที่สุด',
    commandDate: '2026-09-23',
    commander: 'นพ.อภิชัย ลิมานนท์ (นพ.สสจ.ขอนแก่น)',
    urgency: 'ด่วนที่สุด',
    secretLevel: 'ปกติ',
    fileName: 'MOF_Expedite_Budget_Q4.pdf',
    fileSize: '1.8 MB',
    pageCount: 8,
    status: 'TASKS_CREATED',
    aiAnalysis: {
      confidence: 94,
      extractedOrders: [
        'รวบรวมรายงานผลการเบิกจ่ายงบประมาณไตรมาส 3 และ 4',
        'ติดตาม PO ที่ยังไม่ส่งมอบของโรงพยาบาลชุมชน'
      ],
      suggestedWorkstream: 'budget',
      suggestedAssignee: 'นายสมชาย บุญชู',
      suggestedDeadline: '2026-10-05',
      summary: 'เร่งรัดผลการเบิกจ่ายงบประมาณไตรมาส 3-4 ประจำปี 2569'
    }
  },
  {
    id: 'doc-003',
    docNo: 'ขก 0032.002/ว 8840',
    date: '2026-10-01',
    receivedDate: '2026-10-02',
    title: 'ขอเชิญประชุมคณะกรรมการพัฒนาระบบข้อมูลสุขภาพจังหวัดขอนแก่น (Khon Kaen Health Data Center)',
    sender: 'ศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร เขตสุขภาพที่ 7',
    receiver: 'นพ.สสจ.ขอนแก่น',
    commandNote: 'มอบกลุ่มงานข้อมูล เข้าร่วมประชุมและเตรียมนำเสนอสถานะ Dashboard อัตราครองเตียงและโรคไม่ติดต่อ',
    commandDate: '2026-10-02',
    commander: 'นพ.อภิชัย ลิมานนท์ (นพ.สสจ.ขอนแก่น)',
    urgency: 'ด่วน',
    secretLevel: 'ปกติ',
    fileName: 'Meeting_HealthData_Center_Region7.pdf',
    fileSize: '2.1 MB',
    pageCount: 6,
    status: 'TASKS_CREATED',
    aiAnalysis: {
      confidence: 98,
      extractedOrders: [
        'จัดเตรียมข้อมูลสถิติและการเชื่อมโยง HDC',
        'ประสานงานเข้าร่วมประชุม 7 ต.ค. 69 เวลา 15:00 น.'
      ],
      suggestedWorkstream: 'data',
      suggestedAssignee: 'นางสาวกนกวรรณ จันทร์เพ็ญ',
      suggestedDeadline: '2026-10-07',
      summary: 'ประชุมคณะกรรมการข้อมูลสุขภาพจังหวัดขอนแก่น วันที่ 7 ต.ค. 69'
    }
  },
  {
    id: 'doc-004',
    docNo: 'ขก 0032.001/ว 1102',
    date: '2026-10-03',
    receivedDate: '2026-10-04',
    title: 'แผนการออกตรวจราชการและนิเทศงานกรณีปกติ รอบที่ 1/2570 ณ รพ.ขอนแก่น และ รพช.เป้าหมาย',
    sender: 'สำนักงานเขตสุขภาพที่ 7',
    receiver: 'นพ.สสจ.ขอนแก่น',
    commandNote: 'มอบทีมตรวจราชการจังหวัดเตรียมเอกสาร สรุปประเด็นปัญหา และจัดเตรียมทีมร่วมลงพื้นที่ 7 ต.ค. 69',
    commandDate: '2026-10-04',
    commander: 'นพ.อภิชัย ลิมานนท์ (นพ.สสจ.ขอนแก่น)',
    urgency: 'ด่วน',
    secretLevel: 'ปกติ',
    fileName: 'Inspection_Plan_Round1_2570.pdf',
    fileSize: '4.5 MB',
    pageCount: 18,
    status: 'TASKS_CREATED',
    aiAnalysis: {
      confidence: 95,
      extractedOrders: [
        'รวบรวมแบบประเมินผลการตรวจราชการ',
        'นัดหมายคณะกรรมการนิเทศร่วมลงพื้นที่ รพ.ขอนแก่น 7 ต.ค. 69 เวลา 13:00 น.'
      ],
      suggestedWorkstream: 'supervision',
      suggestedAssignee: 'นายสมชาย บุญชู',
      suggestedDeadline: '2026-10-07',
      summary: 'นิเทศติดตาม รพ.ขอนแก่น และเครือข่ายบริการสุขภาพ'
    }
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-001',
    code: 'ORD-2569-001',
    documentId: 'doc-002',
    documentNo: 'สธ 0312/ว 1420',
    orderText: 'รายงานผลการดำเนินงานและการเบิกจ่ายงบประมาณไตรมาส 3 ปี 2569',
    priority: 'CRITICAL',
    workstreamId: 'data',
    suggestedAssignee: 'นายสมชาย บุญชู',
    suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
    deadline: '2026-10-05',
    status: 'OVERDUE',
    progress: 40,
    taskIds: ['tsk-001'],
    aiConfidence: 94,
    humanConfirmed: true
  },
  {
    id: 'ord-002',
    code: 'ORD-2569-002',
    documentId: 'doc-001',
    documentNo: 'สธ 0208.04/ว 2541',
    orderText: 'จัดประชุมคณะกรรมการพัฒนาระบบสุขภาพและขับเคลื่อนแผนงาน',
    priority: 'HIGH',
    workstreamId: 'plan',
    suggestedAssignee: 'นางสาวจุฬารัตน์ วงศ์คำ',
    suggestedDepartment: 'กลุ่มงานยุทธศาสตร์',
    deadline: '2026-10-10',
    status: 'ASSIGNED',
    progress: 60,
    taskIds: ['tsk-002'],
    aiConfidence: 91,
    humanConfirmed: true
  },
  {
    id: 'ord-003',
    code: 'ORD-2569-003',
    documentId: 'doc-001',
    documentNo: 'สธ 0208.04/ว 2541',
    orderText: 'จัดทำแผนปฏิบัติราชการประจำปี 2570 และกรอบวงเงินงบประมาณ',
    priority: 'NORMAL',
    workstreamId: 'plan',
    suggestedAssignee: 'นายยิ่งยศ ศรีมงคล',
    suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
    deadline: '2026-10-15',
    status: 'IN_PROGRESS',
    progress: 70,
    taskIds: ['tsk-003'],
    aiConfidence: 96,
    humanConfirmed: true
  },
  {
    id: 'ord-004',
    code: 'ORD-2569-004',
    documentId: 'doc-003',
    documentNo: 'ขก 0032.002/ว 8840',
    orderText: 'ส่งข้อมูลสุขภาวะพระคันธรจังหวัดขอนแก่นเข้าสู่ระบบกลาง',
    priority: 'NORMAL',
    workstreamId: 'data',
    suggestedAssignee: 'นางสาวกนกวรรณ จันทร์เพ็ญ',
    suggestedDepartment: 'กลุ่มงานข้อมูล',
    deadline: '2026-10-03',
    status: 'COMPLETED',
    progress: 100,
    taskIds: ['tsk-004'],
    aiConfidence: 97,
    humanConfirmed: true
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-001',
    code: 'TSK-2569-001',
    title: 'รายงานผลการดำเนินงานไตรมาส 3',
    description: 'รวบรวมตัวเลขผลสัมฤทธิ์ของโครงการและผลการเบิกจ่ายจริงเทียบกับเป้าหมายไตรมาส 3 ของ สสจ.ขอนแก่น',
    sourceOrderId: 'ord-001',
    sourceDocumentId: 'doc-002',
    sourceDocumentNo: 'สธ 0312/ว 1420',
    workstreamId: 'data',
    subWork: 'Dashboard / รายงาน',
    department: 'พัฒนายุทธศาสตร์',
    primaryAssignee: 'นายสมชาย',
    primaryAssigneeId: 'u-2',
    collaborators: ['นางสาวกนกวรรณ จันทร์เพ็ญ'],
    priority: 'CRITICAL',
    status: 'OVERDUE',
    progress: 40,
    startDate: '2026-09-25',
    deadline: '2026-10-05',
    risk: 'CRITICAL',
    blocker: 'ยังรอข้อมูลผลการเบิกจ่ายจริงจาก 3 โรงพยาบาลชุมชน',
    remark: 'ต้องประสานงานผู้อำนวยการ รพช. โดยด่วน',
    evidence: [
      {
        id: 'ev-1',
        fileName: 'Draft_Report_Q3_KK.xlsx',
        fileSize: '1.2 MB',
        fileType: 'XLSX',
        uploadedAt: '2026-10-04 15:30',
        uploadedBy: 'นายสมชาย บุญชู',
        url: '#'
      }
    ],
    updates: [
      {
        id: 'up-1',
        taskId: 'tsk-001',
        timestamp: '2026-10-04 15:30',
        userName: 'นายสมชาย บุญชู',
        userRole: 'ผู้รับผิดชอบหลัก',
        progressPercent: 40,
        status: 'OVERDUE',
        comment: 'รวบรวมข้อมูลได้ 17 จาก 20 อำเภอ ยังขาด 3 อำเภอ',
        blocker: 'รอข้อมูลการเงินจากพื้นที่'
      }
    ],
    createdDate: '2026-09-24',
    updatedDate: '2026-10-04'
  },
  {
    id: 'tsk-002',
    code: 'TSK-2569-002',
    title: 'จัดประชุมคณะกรรมการ',
    description: 'จัดเตรียมเอกสารระเบียบวาระ และเชิญคณะกรรมการพัฒนาระบบสุขภาพเข้าร่วมประชุม ณ ห้องประชุม 1',
    sourceOrderId: 'ord-002',
    sourceDocumentId: 'doc-001',
    sourceDocumentNo: 'สธ 0208.04/ว 2541',
    workstreamId: 'plan',
    subWork: 'แผนงาน',
    department: 'ยุทธศาสตร์',
    primaryAssignee: 'นางสาวจุฬารัตน์',
    primaryAssigneeId: 'u-3',
    collaborators: ['นายยิ่งยศ ศรีมงคล'],
    priority: 'HIGH',
    status: 'ASSIGNED',
    progress: 60,
    startDate: '2026-10-01',
    deadline: '2026-10-10',
    risk: 'MEDIUM',
    remark: 'ประสานวิทยากรเรียบร้อยแล้ว กำลังจัดทำรูปเล่มวาระ',
    evidence: [
      {
        id: 'ev-2',
        fileName: 'Agenda_Meeting_2570.pdf',
        fileSize: '840 KB',
        fileType: 'PDF',
        uploadedAt: '2026-10-05 11:20',
        uploadedBy: 'นางสาวจุฬารัตน์ วงศ์คำ',
        url: '#'
      }
    ],
    updates: [
      {
        id: 'up-2',
        taskId: 'tsk-002',
        timestamp: '2026-10-05 11:20',
        userName: 'นางสาวจุฬารัตน์ วงศ์คำ',
        userRole: 'ผู้รับผิดชอบหลัก',
        progressPercent: 60,
        status: 'ASSIGNED',
        comment: 'ออกหนังสือเชิญกรรมการเรียบร้อย อยู่ระหว่างรวบรวมเอกสารวาระที่ 3'
      }
    ],
    createdDate: '2026-10-01',
    updatedDate: '2026-10-05'
  },
  {
    id: 'tsk-003',
    code: 'TSK-2569-003',
    title: 'จัดทำแผนปฏิบัติราชการ 2570',
    description: 'ยกร่างแผนปฏิบัติราชการประจำปีงบประมาณ 2570 ตามกรอบยุทธศาสตร์ 4 ขางาน และตัวชี้วัดกระทรวงสาธารณสุข',
    sourceOrderId: 'ord-003',
    sourceDocumentId: 'doc-001',
    sourceDocumentNo: 'สธ 0208.04/ว 2541',
    workstreamId: 'plan',
    subWork: 'ตัวชี้วัด / Action Plan',
    department: 'พัฒนายุทธศาสตร์',
    primaryAssignee: 'นายยิ่งยศ',
    primaryAssigneeId: 'u-4',
    collaborators: ['นายสมชาย บุญชู'],
    priority: 'NORMAL',
    status: 'IN_PROGRESS',
    progress: 70,
    startDate: '2026-09-28',
    deadline: '2026-10-15',
    risk: 'NORMAL',
    remark: 'ร่างโครงสร้างแผนเสร็จแล้ว 70% อยู่ระหว่างรับฟังข้อเสนอแนะ',
    evidence: [
      {
        id: 'ev-3',
        fileName: 'Draft_ActionPlan_2570_V2.docx',
        fileSize: '2.4 MB',
        fileType: 'DOCX',
        uploadedAt: '2026-10-06 14:15',
        uploadedBy: 'นายยิ่งยศ ศรีมงคล',
        url: '#'
      }
    ],
    updates: [
      {
        id: 'up-3',
        taskId: 'tsk-003',
        timestamp: '2026-10-06 14:15',
        userName: 'นายยิ่งยศ ศรีมงคล',
        userRole: 'ผู้รับผิดชอบหลัก',
        progressPercent: 70,
        status: 'IN_PROGRESS',
        comment: 'ร่างกรอบตัวชี้วัดหลัก 15 ตัวชี้วัดแล้วเสร็จ'
      }
    ],
    createdDate: '2026-09-28',
    updatedDate: '2026-10-06'
  },
  {
    id: 'tsk-004',
    code: 'TSK-2569-004',
    title: 'ส่งข้อมูลสุขภาวะพระคันธรจังหวัด',
    description: 'ตรวจสอบความถูกต้องและเชื่อมโยงข้อมูลสุขภาพพระสงฆ์ตามโครงการพระคันธร ขอนแก่น เข้าสู่ฐานข้อมูลกลาง',
    sourceOrderId: 'ord-004',
    sourceDocumentId: 'doc-003',
    sourceDocumentNo: 'ขก 0032.002/ว 8840',
    workstreamId: 'data',
    subWork: 'ข้อมูลสุขภาพ / Data Request',
    department: 'ข้อมูล',
    primaryAssignee: 'นางสาวกนกวรรณ',
    primaryAssigneeId: 'u-5',
    collaborators: [],
    priority: 'NORMAL',
    status: 'COMPLETED',
    progress: 100,
    startDate: '2026-09-22',
    deadline: '2026-10-03',
    risk: 'NORMAL',
    remark: 'ส่งข้อมูลครบถ้วน 100% ได้รับใบตอบรับจากส่วนกลางแล้ว',
    evidence: [
      {
        id: 'ev-4',
        fileName: 'Certificate_DataSync_Completed.pdf',
        fileSize: '450 KB',
        fileType: 'PDF',
        uploadedAt: '2026-10-03 16:45',
        uploadedBy: 'นางสาวกนกวรรณ จันทร์เพ็ญ',
        url: '#'
      }
    ],
    updates: [
      {
        id: 'up-4',
        taskId: 'tsk-004',
        timestamp: '2026-10-03 16:45',
        userName: 'นางสาวกนกวรรณ จันทร์เพ็ญ',
        userRole: 'ผู้รับผิดชอบหลัก',
        progressPercent: 100,
        status: 'COMPLETED',
        comment: 'ตรวจสอบและยืนยันข้อมูลเรียบร้อย ปิดงานเสร็จสิ้น'
      }
    ],
    createdDate: '2026-09-22',
    updatedDate: '2026-10-03',
    completedDate: '2026-10-03'
  },
  {
    id: 'tsk-005',
    code: 'TSK-2569-005',
    title: 'จัดสรรงบลงทุนครุภัณฑ์การแพทย์ รพช.',
    description: 'ประสานงานกับกลุ่มงานพัสดุและ รพ.ชุมชน เพื่อยืนยันคุณลักษณะเฉพาะและเตรียมเปิดซองจัดซื้อ',
    sourceOrderId: 'ord-002',
    sourceDocumentId: 'doc-002',
    sourceDocumentNo: 'สธ 0312/ว 1420',
    workstreamId: 'budget',
    subWork: 'งบประมาณ / จัดสรร',
    department: 'บริหารทั่วไป',
    primaryAssignee: 'นายยิ่งยศ',
    primaryAssigneeId: 'u-4',
    collaborators: ['นายสมชาย บุญชู'],
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    progress: 55,
    startDate: '2026-09-20',
    deadline: '2026-10-09',
    risk: 'HIGH',
    blocker: 'รออนุมัติเปลี่ยนแปลงรายการจากกรม 1 รายการ',
    evidence: [],
    updates: [],
    createdDate: '2026-09-20',
    updatedDate: '2026-10-05'
  },
  {
    id: 'tsk-006',
    code: 'TSK-2569-006',
    title: 'เตรียมการนิเทศติดตาม รพ.ขอนแก่น',
    description: 'จัดทำคู่มือประเมินผลและจัดเตรียมทีมแพทย์ผู้เชี่ยวชาญลงตรวจพื้นที่ร่วมกับคณะกรรมการนิเทศ',
    sourceOrderId: 'ord-004',
    sourceDocumentId: 'doc-004',
    sourceDocumentNo: 'ขก 0032.001/ว 1102',
    workstreamId: 'supervision',
    subWork: 'แผนนิเทศ / จังหวัด / CUP',
    department: 'พัฒนายุทธศาสตร์',
    primaryAssignee: 'นายสมชาย',
    primaryAssigneeId: 'u-2',
    collaborators: ['นางสาวจุฬารัตน์ วงศ์คำ'],
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    progress: 85,
    startDate: '2026-10-02',
    deadline: '2026-10-07',
    risk: 'HIGH',
    evidence: [],
    updates: [],
    createdDate: '2026-10-02',
    updatedDate: '2026-10-06'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-cal-01',
    title: 'ประชุมจัดทำแผนปฏิบัติราชการ 2570',
    date: '2026-10-07',
    time: '09:00 - 12:00',
    location: 'ห้องประชุม 1 ชั้น 3 สสจ.ขอนแก่น',
    organizer: 'กลุ่มงานพัฒนายุทธศาสตร์',
    department: 'กลุ่มงานพัฒนายุทธศาสตร์',
    participants: ['นพ.สสจ.ขอนแก่น', 'หัวหน้ากลุ่มงานทุกกลุ่ม', 'นายสมชาย บุญชู'],
    relatedDocumentId: 'doc-001',
    relatedTaskId: 'tsk-003',
    workstreamId: 'plan',
    type: 'MEETING'
  },
  {
    id: 'ev-cal-02',
    title: 'นิเทศติดตาม รพ.ขอนแก่น',
    date: '2026-10-07',
    time: '13:00 - 16:30',
    location: 'ห้องประชุมจำลอง มุ่งการดี รพ.ขอนแก่น',
    organizer: 'คณะกรรมการนิเทศ',
    department: 'คณะกรรมการนิเทศ สสจ.ขอนแก่น',
    participants: ['นพ.สสจ.ขอนแก่น', 'ผอ.รพ.ขอนแก่น', 'คณะกรรมการนิเทศ'],
    relatedDocumentId: 'doc-004',
    relatedTaskId: 'tsk-006',
    workstreamId: 'supervision',
    type: 'SUPERVISION'
  },
  {
    id: 'ev-cal-03',
    title: 'ประชุมคณะกรรมการข้อมูล',
    date: '2026-10-07',
    time: '15:00 - 17:00',
    location: 'ห้องประชุม 2 ชั้น 2 สสจ.ขอนแก่น',
    organizer: 'กลุ่มงานข้อมูล',
    department: 'กลุ่มงานเทคโนโลยีสารสนเทศและข้อมูล',
    participants: ['นางสาวกนกวรรณ จันทร์เพ็ญ', 'ตัวแทน รพช. 20 แห่ง'],
    relatedDocumentId: 'doc-003',
    relatedTaskId: 'tsk-004',
    workstreamId: 'data',
    type: 'MEETING'
  },
  {
    id: 'ev-cal-04',
    title: 'ส่งร่างงบประมาณเงินบำรุงประจำปี 2570',
    date: '2026-10-10',
    time: '16:30 น.',
    location: 'กลุ่มงานบริหารทั่วไป',
    organizer: 'กลุ่มงานการเงิน',
    department: 'บริหารทั่วไป',
    participants: ['นายยิ่งยศ ศรีมงคล'],
    workstreamId: 'budget',
    type: 'DEADLINE'
  },
  {
    id: 'ev-cal-05',
    title: 'ประชุมชี้แจงกรอบการเบิกจ่ายงบกองทุน กสศ.',
    date: '2026-10-13',
    time: '10:00 - 12:00',
    location: 'ผ่านระบบ Zoom Cloud Meeting',
    organizer: 'กลุ่มงานการเงิน',
    department: 'บริหารทั่วไป',
    participants: ['นายสมชาย บุญชู'],
    workstreamId: 'budget',
    type: 'MEETING'
  },
  {
    id: 'ev-cal-06',
    title: 'ลงพื้นที่ติดตาม รพ.สต.ถ่ายโอน อบจ.ขอนแก่น',
    date: '2026-10-15',
    time: '08:30 - 16:30',
    location: 'อ.เมือง และ อ.น้ำพอง',
    organizer: 'คณะทำงานปฐมภูมิ',
    department: 'พัฒนายุทธศาสตร์',
    participants: ['นพ.สสจ.ขอนแก่น', 'นายสมชาย บุญชู'],
    workstreamId: 'supervision',
    type: 'FIELDWORK'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'notif-1',
    title: 'เกินกำหนดส่งรายงาน (Overdue)',
    message: 'รายงานผลการดำเนินงานไตรมาส 3 เกินกำหนดเมื่อ 5 ต.ค. 69 (ความคืบหน้า 40%)',
    type: 'OVERDUE',
    timestamp: '10 นาทีที่แล้ว',
    isRead: false,
    relatedTaskId: 'tsk-001'
  },
  {
    id: 'notif-2',
    title: 'ภารกิจด่วนวันนี้ (09:00 น.)',
    message: 'ประชุมจัดทำแผนปฏิบัติราชการ 2570 ณ ห้องประชุม 1 สสจ.ขอนแก่น',
    type: 'MEETING',
    timestamp: '30 นาทีที่แล้ว',
    isRead: false
  },
  {
    id: 'notif-3',
    title: 'ใกล้ครบกำหนดส่งมอบ (ภายใน 2 วัน)',
    message: 'จัดสรรงบลงทุนครุภัณฑ์การแพทย์ รพช. จะครบกำหนดในวันที่ 9 ต.ค. 69',
    type: 'DEADLINE',
    timestamp: '1 ชั่วโมงที่แล้ว',
    isRead: false,
    relatedTaskId: 'tsk-005'
  },
  {
    id: 'notif-4',
    title: 'AI วิเคราะห์หนังสือฉบับใหม่',
    message: 'หนังสือ สธ 0208.04/ว 2541 วิเคราะห์เสร็จสิ้นและแนะนำ 3 ข้อสั่งการ',
    type: 'ASSIGNMENT',
    timestamp: '2 ชั่วโมงที่แล้ว',
    isRead: true
  }
];
