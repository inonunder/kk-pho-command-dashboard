import React from 'react';
import { Task } from '../../types';
import { ExportService } from '../../services/exportService';
import { BarChart3, FileSpreadsheet, FileText, Download, Printer } from 'lucide-react';

interface ReportsViewProps {
  tasks: Task[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ tasks }) => {
  const reportsList = [
    { id: 1, title: '1. รายงานข้อสั่งการทั้งหมด', desc: 'สรุปการสั่งการ นพ.สสจ. และการกระจายงานลงสู่ผู้รับผิดชอบ' },
    { id: 2, title: '2. รายงานงานตาม 4 ขางานหลัก', desc: 'ผลการดำเนินงานเปรียบเทียบ แผนงาน, งบประมาณ, นิเทศ, ข้อมูล' },
    { id: 3, title: '3. รายงานงานตามกลุ่มงาน', desc: 'การติดตามงานแยกตามกลุ่มงานใน สสจ.ขอนแก่น' },
    { id: 4, title: '4. รายงานงานรายบุคคล (Staff Performance)', desc: 'ภาระงานและอัตราความสำเร็จของบุคลากรผู้รับผิดชอบ' },
    { id: 5, title: '5. รายงานงานเกินกำหนด (Overdue Analysis)', desc: 'วิเคราะห์รายการที่เกินกำหนด สาเหตุปัญหา และแนวทางแก้ไข' },
    { id: 6, title: '6. รายงานงานใกล้ครบกำหนด (Due Soon)', desc: 'รายการที่ต้องส่งมอบภายใน 2-7 วัน เพื่อการเร่งรัดล่วงหน้า' },
    { id: 7, title: '7. รายงานผลการดำเนินงานรอบเดือน', desc: 'ความก้าวหน้าภาพรวมและเอกสารหลักฐานประกอบการเบิกจ่าย' },
    { id: 8, title: '8. รายงานประจำวัน (Daily Command Brief)', desc: 'สรุปสถานการณ์ช่วงเช้าและเย็นสำหรับส่งต่อผู้บริหาร' },
    { id: 9, title: '9. Executive Summary Dashboard Report', desc: 'รายงานสรุปภาพรวมสำหรับเสนอที่ประชุม กวป. และผู้ว่าราชการจังหวัด' },
    { id: 10, title: '10. รายงานภาระงานและความคุ้มค่า (Workload)', desc: 'สถิติการจัดสรรทรัพยากรบุคคลและจำนวนชิ้นงาน' },
  ];

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>ศูนย์รายงานและสถิติ (Executive Report Center)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ดาวน์โหลดรายงานทางการราชการและสรุปสถิติเพื่อการบริหารจัดการ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์รายงาน</span>
          </button>
          <button
            onClick={() => ExportService.exportTasksToCSV(tasks, 'KK-PHO_Executive_Report.csv')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
          >
            <Download className="w-4 h-4" />
            <span>Export ทั้งหมด (Excel / CSV)</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {reportsList.map((rep) => (
          <div key={rep.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex items-center justify-between gap-4 hover:border-blue-300 transition">
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-800">{rep.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{rep.desc}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => ExportService.exportTasksToCSV(tasks, `${rep.title}.csv`)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition"
                title="ดาวน์โหลด Excel/CSV"
              >
                <FileSpreadsheet className="w-4 h-4" />
              </button>
              <button
                onClick={() => window.print()}
                className="p-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition"
                title="ดูตัวอย่าง / พิมพ์"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
