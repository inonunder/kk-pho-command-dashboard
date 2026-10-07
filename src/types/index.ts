export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'EXECUTIVE' 
  | 'WORKSTREAM_MANAGER' 
  | 'SUPERVISOR' 
  | 'STAFF';

export interface User {
  id: string;
  name: string;
  position: string;
  department: string;
  role: UserRole;
  avatar?: string;
  email: string;
  phone: string;
}

export type WorkstreamType = 'plan' | 'budget' | 'supervision' | 'data';

export interface WorkstreamInfo {
  id: WorkstreamType;
  code: string;
  name: string;
  fullName: string;
  description: string;
  color: string;
  badgeBg: string;
  tags: string[];
}

export type TaskStatus = 
  | 'WAITING'              // รอรับเรื่อง
  | 'ASSIGNED'             // รับเรื่องแล้ว
  | 'IN_PROGRESS'          // อยู่ระหว่างดำเนินการ
  | 'WAITING_INFORMATION'  // รอข้อมูล/ประสานงาน
  | 'BLOCKED'              // ติดปัญหา
  | 'OVERDUE'              // เกินกำหนด
  | 'COMPLETED'            // ดำเนินการแล้ว (ปิดงานแล้ว)
  | 'CANCELLED';           // ยกเลิก

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL';

export interface EvidenceFile {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'JPG' | 'PNG';
  uploadedAt: string;
  uploadedBy: string;
  url: string;
}

export interface TaskUpdate {
  id: string;
  taskId: string;
  timestamp: string;
  userName: string;
  userRole: string;
  progressPercent: number;
  status: TaskStatus;
  comment: string;
  blocker?: string;
  nextAction?: string;
  evidence?: EvidenceFile[];
}

export interface Task {
  id: string;
  code: string;                // e.g., TSK-2569-001
  title: string;
  description: string;
  sourceOrderId: string;        // Ref Order ID
  sourceDocumentId: string;     // Ref Document ID
  sourceDocumentNo: string;     // e.g., สธ 0312/ว 1420
  workstreamId: WorkstreamType;
  subWork: string;              // e.g., แผนงาน, การเบิกจ่าย, KPI
  department: string;           // e.g., กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข
  primaryAssignee: string;      // Name
  primaryAssigneeId: string;
  collaborators: string[];
  priority: PriorityLevel;
  status: TaskStatus;
  progress: number;             // 0 - 100
  startDate: string;            // YYYY-MM-DD
  deadline: string;             // YYYY-MM-DD
  risk: RiskLevel;
  blocker?: string;
  remark?: string;
  evidence: EvidenceFile[];
  updates: TaskUpdate[];
  createdDate: string;
  updatedDate: string;
  completedDate?: string;
}

export interface Order {
  id: string;
  code: string;                // ORD-2569-001
  documentId: string;
  documentNo: string;
  orderText: string;
  priority: PriorityLevel;
  workstreamId: WorkstreamType;
  suggestedAssignee: string;
  suggestedDepartment: string;
  deadline: string;
  status: TaskStatus;
  progress: number;
  taskIds: string[];
  aiConfidence?: number;
  humanConfirmed?: boolean;
}

export interface Document {
  id: string;
  docNo: string;               // e.g., สธ 0312/ว 1420
  date: string;                // YYYY-MM-DD
  receivedDate: string;        // YYYY-MM-DD
  title: string;
  sender: string;              // e.g., สำนักงานปลัดกระทรวงสาธารณสุข
  receiver: string;            // นพ.สสจ.ขอนแก่น
  commandNote: string;         // ข้อสั่งการ นพ.สสจ.
  commandDate: string;
  commander: string;           // นายแพทย์สาธารณสุขจังหวัดขอนแก่น
  urgency: 'ด่วนที่สุด' | 'ด่วนมาก' | 'ด่วน' | 'ปกติ';
  secretLevel: 'ปกติ' | 'ลับ' | 'ลับมาก';
  fileName: string;
  fileSize: string;
  pageCount: number;
  previewUrl?: string;
  status: 'PENDING_ANALYSIS' | 'ANALYZED' | 'CONFIRMED' | 'TASKS_CREATED';
  aiAnalysis?: {
    confidence: number;
    extractedOrders: string[];
    detectedMeetings?: {
      title: string;
      date: string;
      time: string;
      location: string;
    }[];
    suggestedWorkstream: WorkstreamType;
    suggestedAssignee: string;
    suggestedDeadline: string;
    summary: string;
  };
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;                // YYYY-MM-DD
  time: string;                // e.g., 09:00 - 12:00
  location: string;
  organizer: string;
  department: string;
  participants: string[];
  relatedDocumentId?: string;
  relatedTaskId?: string;
  workstreamId?: WorkstreamType;
  type: 'MEETING' | 'SUPERVISION' | 'DEADLINE' | 'FIELDWORK' | 'TRAINING';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'DEADLINE' | 'OVERDUE' | 'ASSIGNMENT' | 'MEETING' | 'ATTENTION';
  timestamp: string;
  isRead: boolean;
  relatedTaskId?: string;
}

export interface SystemSettings {
  officeNameTh: string;
  officeNameEn: string;
  fiscalYear: number;
  riskThresholds: {
    criticalOverdue: boolean;
    highDaysLeft: number;      // <= 2
    mediumDaysLeftMin: number; // 3
    mediumDaysLeftMax: number; // 7
    normalDaysLeft: number;    // > 7
  };
  lineNotificationEnabled: boolean;
  aiAutoSuggestEnabled: boolean;
}
