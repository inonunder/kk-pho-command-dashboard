import { Task } from '../types';

export class ExportService {
  static exportTasksToCSV(tasks: Task[], filename = 'KK-PHO_Tasks_Export.csv') {
    // Add UTF-8 BOM so Thai text displays correctly in Excel
    const BOM = '\uFEFF';
    const headers = [
      'รหัสงาน',
      'ชื่องาน',
      'ข้อสั่งการต้นทาง',
      'เลขที่หนังสือ',
      'สายงาน',
      'กลุ่มงาน',
      'ผู้รับผิดชอบ',
      'กำหนดส่ง',
      'ความคืบหน้า (%)',
      'สถานะ',
      'ระดับความเสี่ยง',
      'ปัญหา/อุปสรรค'
    ];

    const rows = tasks.map(t => [
      `"${t.code}"`,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${t.sourceOrderId}"`,
      `"${t.sourceDocumentNo}"`,
      `"${t.workstreamId}"`,
      `"${t.department}"`,
      `"${t.primaryAssignee}"`,
      `"${t.deadline}"`,
      `"${t.progress}%"`,
      `"${t.status}"`,
      `"${t.risk}"`,
      `"${(t.blocker || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = BOM + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
