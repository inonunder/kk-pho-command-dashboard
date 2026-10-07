import React from 'react';
import { 
  FileText, 
  ArrowRight, 
  Target, 
  CheckSquare, 
  UserCheck, 
  Clock, 
  Award,
  Sparkles,
  Bot,
  Zap,
  ShieldAlert,
  FolderArchive,
  Compass
} from 'lucide-react';

interface BottomFeatureBarProps {
  onOpenAiBrief: () => void;
  onOpenUpload: () => void;
}

export const BottomFeatureBar: React.FC<BottomFeatureBarProps> = ({
  onOpenAiBrief,
  onOpenUpload
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-4">
      {/* 1. เส้นทางการดำเนินงาน (Traceability) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 flex flex-col justify-between">
        <div className="text-[11px] font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>เส้นทางการดำเนินงาน (Traceability)</span>
        </div>
        <div className="flex items-center justify-between text-[10px] text-slate-600">
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-1">
              <FileText className="w-3.5 h-3.5" />
            </div>
            <span>หนังสือราชการ<br />(PDF)</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-1">
              <Target className="w-3.5 h-3.5" />
            </div>
            <span>ข้อสั่งการ</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-1">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
            <span>งาน / Task</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-1">
              <UserCheck className="w-3.5 h-3.5" />
            </div>
            <span>ผู้รับผิดชอบ</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold mb-1">
              <Clock className="w-3.5 h-3.5" />
            </div>
            <span>เวลา /<br />Deadline</span>
          </div>
          <ArrowRight className="w-3 h-3 text-slate-300 shrink-0" />
          <div className="text-center">
            <div className="w-7 h-7 mx-auto rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-1">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span>ผลลัพธ์</span>
          </div>
        </div>
      </div>

      {/* 2. จุดเด่นของระบบ */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 flex flex-col justify-between">
        <div className="text-[11px] font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>จุดเด่นของระบบ</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center">
          <div 
            onClick={onOpenUpload}
            className="p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition"
          >
            <Bot className="w-4 h-4 mx-auto text-blue-600 mb-0.5" />
            <div className="text-[10px] font-bold text-slate-800">AI OCR</div>
            <div className="text-[8px] text-slate-400">อ่านและจำแนกหนังสือ</div>
          </div>
          <div className="p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition">
            <Zap className="w-4 h-4 mx-auto text-amber-500 mb-0.5" />
            <div className="text-[10px] font-bold text-slate-800">Auto Task</div>
            <div className="text-[8px] text-slate-400">แยกงานอัตโนมัติ</div>
          </div>
          <div className="p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition">
            <Clock className="w-4 h-4 mx-auto text-cyan-600 mb-0.5" />
            <div className="text-[10px] font-bold text-slate-800">Deadline</div>
            <div className="text-[8px] text-slate-400">เตือนกำหนดเวลา</div>
          </div>
          <div className="p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition">
            <ShieldAlert className="w-4 h-4 mx-auto text-rose-500 mb-0.5" />
            <div className="text-[10px] font-bold text-slate-800">Risk Detection</div>
            <div className="text-[8px] text-slate-400">วิเคราะห์ความเสี่ยง</div>
          </div>
          <div className="p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition">
            <FolderArchive className="w-4 h-4 mx-auto text-emerald-600 mb-0.5" />
            <div className="text-[10px] font-bold text-slate-800">Evidence</div>
            <div className="text-[8px] text-slate-400">หลักฐานการดำเนินงาน</div>
          </div>
          <div 
            onClick={onOpenAiBrief}
            className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 cursor-pointer border border-purple-200 transition"
          >
            <Sparkles className="w-4 h-4 mx-auto text-purple-600 mb-0.5" />
            <div className="text-[10px] font-bold text-purple-800">AI Brief</div>
            <div className="text-[8px] text-purple-600">สรุปการตัดสินใจ</div>
          </div>
        </div>
      </div>

      {/* 3. Motto Card */}
      <div className="lg:col-span-3 bg-gradient-to-r from-navy-900 to-[#122e54] text-white rounded-2xl border border-navy-700 shadow-sm p-3.5 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-amber-400" />
        </div>
        <div className="leading-snug">
          <div className="text-xs font-bold text-amber-300">บริหารงานด้วยข้อมูล</div>
          <div className="text-xs font-bold text-white">ขับเคลื่อนด้วยเทคโนโลยี</div>
          <div className="text-[10px] text-slate-300 font-light mt-0.5">เพื่อสุขภาพที่ดีกว่าของประชาชน</div>
        </div>
      </div>
    </div>
  );
};
