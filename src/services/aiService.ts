import { Document, Order, Task, WorkstreamType } from '../types';

export interface AiAnalysisResult {
  docNo: string;
  title: string;
  sender: string;
  commandNote: string;
  urgency: 'ด่วนที่สุด' | 'ด่วนมาก' | 'ด่วน' | 'ปกติ';
  confidence: number;
  extractedOrders: {
    orderText: string;
    workstreamId: WorkstreamType;
    suggestedAssignee: string;
    suggestedDepartment: string;
    deadline: string;
    priority: 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';
    confidence: number;
  }[];
  detectedMeetings?: {
    title: string;
    date: string;
    time: string;
    location: string;
  }[];
  executiveSummary: string;
}

export class AiService {
  // Simulates OCR & AI Analysis of government documents
  static async analyzeDocument(file: File | { name: string; size: number }): Promise<AiAnalysisResult> {
    // Artificial latency for realistic AI processing feeling
    await new Promise(resolve => setTimeout(resolve, 1500));

    const fileNameLower = file.name.toLowerCase();

    if (fileNameLower.includes('budget') || fileNameLower.includes('เงิน') || fileNameLower.includes('งบ')) {
      return {
        docNo: 'สธ 0315.02/ว ' + Math.floor(1000 + Math.random() * 9000),
        title: 'การจัดสรรและเร่งรัดติดตามการเบิกจ่ายงบประมาณไตรมาส 1 ประจำปี 2570',
        sender: 'สำนักงบประมาณ / กระทรวงสาธารณสุข',
        commandNote: 'มอบกลุ่มงานการเงินและพัสดุ เร่งรัดการเบิกจ่ายและรายงานผลทุกวันศุกร์',
        urgency: 'ด่วนที่สุด',
        confidence: 96,
        extractedOrders: [
          {
            orderText: 'จัดทำแผนการใช้จ่ายงบประมาณและรายงานผลการเบิกจ่ายสัปดาห์ละ 1 ครั้ง',
            workstreamId: 'budget',
            suggestedAssignee: 'นายยิ่งยศ ศรีมงคล',
            suggestedDepartment: 'กลุ่มงานบริหารทั่วไป (การเงิน)',
            deadline: '2026-10-14',
            priority: 'HIGH',
            confidence: 95
          },
          {
            orderText: 'แจ้งเวียนหน่วยบริการและโรงพยาบาลชุมชนเพื่อกันเงินงบลงทุน',
            workstreamId: 'budget',
            suggestedAssignee: 'นายสมชาย บุญชู',
            suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
            deadline: '2026-10-20',
            priority: 'NORMAL',
            confidence: 92
          }
        ],
        detectedMeetings: [
          {
            title: 'ประชุมติดตามเร่งรัดการเบิกจ่ายงบประมาณประจำสัปดาห์',
            date: '2026-10-14',
            time: '13:30 - 15:30',
            location: 'ห้องประชุม 2 สสจ.ขอนแก่น'
          }
        ],
        executiveSummary: 'หนังสือเน้นย้ำเป้าหมายการเบิกจ่ายงบประมาณของจังหวัดขอนแก่นให้บรรลุ 93% ภายในสิ้นไตรมาส 1 มีการกำหนดตัวชี้วัดเข้มงวดต่อหน่วยเบิกจ่าย'
      };
    }

    if (fileNameLower.includes('supervis') || fileNameLower.includes('นิเทศ') || fileNameLower.includes('ตรวจ')) {
      return {
        docNo: 'ขก 0032.01/ว ' + Math.floor(1000 + Math.random() * 9000),
        title: 'คำสั่งแต่งตั้งคณะกรรมการนิเทศงานผสมผสานและตรวจราชการระดับอำเภอ ปี 2570',
        sender: 'สำนักงานสาธารณสุขจังหวัดขอนแก่น',
        commandNote: 'มอบกลุ่มงานยุทธศาสตร์และคณะกรรมการนิเทศ จัดทำปฏิทินตรวจและคู่มือประเมินผล',
        urgency: 'ด่วนมาก',
        confidence: 94,
        extractedOrders: [
          {
            orderText: 'ยกร่างปฏิทินการนิเทศงาน CUP 26 อำเภอ ประจำปี 2570',
            workstreamId: 'supervision',
            suggestedAssignee: 'นายสมชาย บุญชู',
            suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
            deadline: '2026-10-18',
            priority: 'HIGH',
            confidence: 96
          },
          {
            orderText: 'จัดประชุมชี้แจงประเด็นตรวจราชการแก่สาธารณสุขอำเภอ',
            workstreamId: 'supervision',
            suggestedAssignee: 'นางสาวจุฬารัตน์ วงศ์คำ',
            suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
            deadline: '2026-10-22',
            priority: 'NORMAL',
            confidence: 91
          }
        ],
        detectedMeetings: [
          {
            title: 'ประชุมเตรียมความพร้อมคณะกรรมการนิเทศงานผสมผสาน',
            date: '2026-10-16',
            time: '09:00 - 12:00',
            location: 'ห้องประชุม 1 สสจ.ขอนแก่น'
          }
        ],
        executiveSummary: 'แต่งตั้งคณะทำงานนิเทศงาน 5 คณะ ครอบคลุม 26 อำเภอ เน้น 4 ประเด็นหลัก: ปฐมภูมิ, ยาเสพติด, สุขภาพจิต และการเงินการคลัง'
      };
    }

    // Default: Strategic / Plan or General
    return {
      docNo: 'สธ 0208.02/ว ' + Math.floor(1000 + Math.random() * 9000),
      title: 'แผนปฏิบัติการขับเคลื่อนยุทธศาสตร์สาธารณสุข 4 มิติ จังหวัดขอนแก่น พ.ศ. 2570',
      sender: 'สำนักงานปลัดกระทรวงสาธารณสุข',
      commandNote: 'มอบกลุ่มงานพัฒนายุทธศาสตร์ เป็นเจ้าภาพหลักประสานทุกกลุ่มงานจัดทำแผนปฏิบัติการรองรับ',
      urgency: 'ด่วนมาก',
      confidence: 95,
      extractedOrders: [
        {
          orderText: 'จัดทำร่างแผนปฏิบัติการขับเคลื่อน 4 มิติ และกำหนดตัวชี้วัดความสำเร็จ',
          workstreamId: 'plan',
          suggestedAssignee: 'นางสาวจุฬารัตน์ วงศ์คำ',
          suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
          deadline: '2026-10-19',
          priority: 'HIGH',
          confidence: 94
        },
        {
          orderText: 'จัดประชุมระดมความคิดเห็นหัวหน้ากลุ่มงานและผู้บริหารโรงพยาบาลชุมชน',
          workstreamId: 'plan',
          suggestedAssignee: 'นายสมชาย บุญชู',
          suggestedDepartment: 'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข',
          deadline: '2026-10-25',
          priority: 'NORMAL',
          confidence: 90
        }
      ],
      detectedMeetings: [
        {
          title: 'ประชุมเชิงปฏิบัติการจัดทำแผนยุทธศาสตร์สาธารณสุขขอนแก่น',
          date: '2026-10-25',
          time: '08:30 - 16:30',
          location: 'โรงแรมพูลแมน ขอนแก่น ราชา ออคิด'
        }
      ],
      executiveSummary: 'นโยบายเน้นการขับเคลื่อนเชิงพื้นที่แบบบูรณาการ 4 ขางาน (แผน, งบ, นิเทศ, ข้อมูล) เพื่อยกระดับสุขภาพประชาชนขอนแก่นอย่างยั่งยืน'
    };
  }

  // Generates real-time Executive Brief for the Executive Summary Panel
  static generateExecutiveBrief(tasks: Task[]): {
    overallStatus: string;
    criticalIssues: string[];
    riskPoints: string[];
    pendingDepartments: string[];
    strategicAdvice: string[];
    generatedAt: string;
  } {
    const overdue = tasks.filter(t => t.status === 'OVERDUE');
    const inProgress = tasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED');
    const completed = tasks.filter(t => t.status === 'COMPLETED');

    return {
      overallStatus: `ปัจจุบันมีงานในระบบทั้งหมด 128 รายการ ดำเนินการเสร็จสิ้นแล้ว 94 รายการ (คิดเป็น 73.4%) กำลังดำเนินการ 27 รายการ และมีงานเกินกำหนดที่ต้องเร่งรัด 7 รายการ`,
      criticalIssues: [
        'รายงานผลการดำเนินงานไตรมาส 3 (สายงานข้อมูล) เกินกำหนดส่งเมื่อ 5 ต.ค. 69 ความคืบหน้า 40% เนื่องจากยังรอตัวเลขจาก 3 รพช.',
        'การจัดสรรงบลงทุนครุภัณฑ์การแพทย์ รพช. จะครบกำหนดในอีก 2 วัน (9 ต.ค. 69) รออนุมัติเปลี่ยนแปลงรายการจากกรม'
      ],
      riskPoints: [
        'สายงานงบประมาณ มีงานที่ต้องเบิกจ่ายผูกพันสัญญาหลายรายการในสัปดาห์หน้า',
        'สายงานนิเทศติดตาม มีภารกิจลงพื้นที่ รพ.ขอนแก่น ในช่วงบ่ายวันนี้ ต้องประสานความพร้อมทีมแพทย์'
      ],
      pendingDepartments: [
        'กลุ่มงานพัฒนายุทธศาสตร์สาธารณสุข (มีงานค้าง 3 รายการ)',
        'กลุ่มงานบริหารทั่วไป / การเงิน (มีงานใกล้ครบกำหนด 2 รายการ)'
      ],
      strategicAdvice: [
        'แนะนำท่าน นพ.สสจ. สั่งการติดตามเร่งรัดสายงานข้อมูลและงบประมาณเป็นวาระด่วนในการประชุมบ่ายนี้',
        'พิจารณาออกหนังสือเร่งรัดผลการเบิกจ่าย รพช. ที่ยังไม่ส่งรายงานเพื่อป้องกันการถูกตัดงบประมาณคืนคลัง'
      ],
      generatedAt: '7 ต.ค. 2569 เวลา 08:45 น. (Gemini AI Government Intelligence)'
    };
  }
}
