import React from 'react';
import { Task } from '../../types';
import { AiService } from '../../services/aiService';
import { Sparkles, X, AlertTriangle, ShieldCheck, CheckCircle2, Bot, ArrowRight } from 'lucide-react';

interface AiExecutiveBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

export const AiExecutiveBriefModal: React.FC<AiExecutiveBriefModalProps> = ({
  isOpen,
  onClose,
  tasks
}) => {
  if (!isOpen) return null;

  const brief = AiService.generateExecutiveBrief(tasks);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-900 via-purple-900 to-[#122e54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold flex items-center gap-2">
                <span>AI Executive Brief</span>
                <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-white/20">
                  สรุปเพื่อการตัดสินใจผู้บริหาร
                </span>
              </h3>
              <p className="text-xs text-purple-200">{brief.generatedAt}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Situation Overview */}
          <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5">
            <h4 className="font-bold text-purple-900 mb-1 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-600" />
              <span>สถานการณ์ภาพรวม (Situation Overview)</span>
            </h4>
            <p className="text-slate-700 leading-relaxed font-medium">
              {brief.overallStatus}
            </p>
          </div>

          {/* Critical Issues */}
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3.5">
            <h4 className="font-bold text-rose-900 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>ประเด็นเร่งด่วนที่ต้องสั่งการ (Urgent Matters)</span>
            </h4>
            <ul className="space-y-1.5">
              {brief.criticalIssues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed">{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic Advice */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5">
            <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ข้อเสนอแนะเชิงยุทธศาสตร์แก่ นพ.สสจ. (Strategic Recommendations)</span>
            </h4>
            <ul className="space-y-1.5">
              {brief.strategicAdvice.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span className="leading-relaxed font-medium">{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[10px] text-slate-400 text-center italic">
            * สรุปอัตโนมัติด้วย AI ขับเคลื่อนด้วยข้อมูลจริงในฐานข้อมูลระบบ KK-PHO Command Center
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition shadow-sm"
          >
            รับทราบและปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
};
