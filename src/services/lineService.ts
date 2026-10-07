import { Task, CalendarEvent } from '../types';

export class LineService {
  static getMorningBrief(tasks: Task[], events: CalendarEvent[]): string {
    const todayEvents = events.filter(e => e.date === '2026-10-07');
    const urgentTasks = tasks.filter(t => t.status === 'OVERDUE' || t.risk === 'CRITICAL');
    const dueSoon = tasks.filter(t => t.status !== 'COMPLETED' && t.risk === 'HIGH');

    let text = `🟢 [KK-PHO Daily Command]\n`;
    text += `สรุปภาพรวมประจำวันที่ 7 ตุลาคม 2569\n\n`;
    text += `📊 สถานะงานทั้งหมด:\n`;
    text += `▪️ งานทั้งหมด: 128 รายการ\n`;
    text += `▪️ ปิดงานแล้ว: 94 รายการ (73.4%)\n`;
    text += `▪️ ดำเนินการ: 27 รายการ\n`;
    text += `▪️ เกินกำหนด: 7 รายการ ⚠️\n\n`;

    text += `🚨 ประเด็นที่ต้องสั่งการ/เร่งรัด (${urgentTasks.length + dueSoon.length} เรื่อง):\n`;
    tasks.slice(0, 3).forEach((t, idx) => {
      text += `${idx + 1}. ${t.title} (${t.primaryAssignee}) - ${t.status === 'OVERDUE' ? '🔴 เกินกำหนด' : '🟠 ใกล้ครบ'}\n`;
    });

    text += `\n📅 นัดหมาย/กิจกรรมวันนี้ (${todayEvents.length} รายการ):\n`;
    todayEvents.forEach(e => {
      text += `⏱ ${e.time.split(' ')[0]} : ${e.title} (${e.location.split(' ')[0]})\n`;
    });

    text += `\n💡 AI สรุปประเด็นบริหาร:\n"ขอให้เร่งรัดการเบิกจ่ายงบไตรมาส 3 และติดตามข้อมูล รพช. 3 แห่ง"\n`;
    text += `\n🔗 ตรวจสอบรายละเอียด: https://kkpho-command.moph.go.th`;

    return text;
  }

  static getClosingReport(tasks: Task[]): string {
    let text = `🌙 [KK-PHO Closing Report]\n`;
    text += `รายงานสรุปผลการปฏิบัติราชการประจำวัน\n`;
    text += `วันพุธที่ 7 ตุลาคม 2569 (18:00 น.)\n\n`;
    text += `✅ งานที่ปิดสำเร็จวันนี้: 3 รายการ\n`;
    text += `▪️ ส่งข้อมูลสุขภาวะพระคันธรจังหวัด (100%)\n`;
    text += `▪️ ประชุมเตรียมการนิเทศติดตาม รพ.ขอนแก่น เรียบร้อย\n\n`;
    text += `📈 งานที่มีความก้าวหน้าเด่นชัด:\n`;
    text += `▪️ แผนปฏิบัติราชการ 2570 ก้าวหน้า 70%\n`;
    text += `▪️ จัดสรรงบลงทุนครุภัณฑ์การแพทย์ ก้าวหน้า 55%\n\n`;
    text += `⚠️ ประเด็นเสี่ยงที่ต้องติดตามพรุ่งนี้:\n`;
    text += `▪️ ติดตามตัวเลขเบิกจ่ายจาก 3 รพช. ขอนแก่น\n`;
    text += `▪️ จัดทำวาระการประชุมคณะกรรมการพัฒนาระบบสุขภาพ\n\n`;
    text += `ศูนย์บริหารข้อสั่งการ KK-PHO Command Center`;
    return text;
  }
}
