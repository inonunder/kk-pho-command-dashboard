import React from 'react';
import { MessageSquare, ArrowRight, CheckCircle2, Clock, Smartphone } from 'lucide-react';

interface LineBriefWidgetProps {
  onOpenLineModal: () => void;
}

export const LineBriefWidget: React.FC<LineBriefWidgetProps> = ({ onOpenLineModal }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 flex flex-col justify-between h-full">
      <div>
        {/* Header with LINE Green */}
        <div className="flex items-center space-x-2 mb-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#06C755] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            L
          </div>
          <h3 className="text-xs font-bold text-slate-800">รายงานผ่าน LINE</h3>
        </div>

        {/* 06:00 Morning Brief */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-2">
          <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>06:00 น. รายงานตอนเช้า (Daily Brief)</span>
          </div>
          <div className="space-y-0.5 text-[10px] text-slate-600 pl-5">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
              <span>ภาพรวมงานทั้งหมด</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
              <span>งานที่ปิดแล้ว / ตกค้าง</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
              <span>นัดหมาย / ประชุม</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
              <span>สรุปประเด็นสำคัญ (AI วิเคราะห์)</span>
            </div>
          </div>
        </div>

        {/* 18:00 Closing Report */}
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>18:00 น. รายงานตอนเย็น (Closing Report)</span>
          </div>
          <div className="space-y-0.5 text-[10px] text-slate-600 pl-5">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 shrink-0" />
              <span>ผลการดำเนินงานวันนี้</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 shrink-0" />
              <span>งานที่ปิดแล้ว / ตกค้าง</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 shrink-0" />
              <span>ประเด็นเสี่ยง / ข้อเสนอแนะ</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5 text-blue-500 shrink-0" />
              <span>งานที่ต้องติดตามพรุ่งนี้</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to open simulated LINE screen */}
      <div className="mt-3">
        <button
          onClick={onOpenLineModal}
          className="w-full py-2 px-3 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
        >
          <Smartphone className="w-4 h-4" />
          <span>ดูตัวอย่างข้อความใน LINE</span>
          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
};
