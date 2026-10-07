import React, { useState } from 'react';
import { Task, CalendarEvent } from '../../types';
import { LineService } from '../../services/lineService';
import { X, Copy, Check, Smartphone, Bell, Share2 } from 'lucide-react';

interface LineChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  events: CalendarEvent[];
}

export const LineChatModal: React.FC<LineChatModalProps> = ({
  isOpen,
  onClose,
  tasks,
  events
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'morning' | 'closing'>('morning');
  const [copied, setCopied] = useState(false);

  const morningText = LineService.getMorningBrief(tasks, events);
  const closingText = LineService.getClosingReport(tasks);
  const activeText = tab === 'morning' ? morningText : closingText;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-700 max-w-sm w-full relative">
        {/* Phone Notch */}
        <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-2 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
        </div>

        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-1 rounded-full transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Phone Inner Screen (LINE Interface) */}
        <div className="bg-[#8cabd9] rounded-[2.2rem] h-[580px] flex flex-col overflow-hidden text-slate-800">
          {/* LINE Top Bar */}
          <div className="bg-[#24354a] text-white p-3 flex items-center justify-between shadow">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-emerald-700 border border-emerald-400 flex items-center justify-center text-[10px] font-bold">
                KK
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">KK-PHO Daily Command</div>
                <div className="text-[9px] text-slate-300">Official Executive Bot</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-300 font-mono">08:45</div>
          </div>

          {/* Sub-header Tabs */}
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1.5 flex gap-1 border-b border-slate-200">
            <button
              onClick={() => setTab('morning')}
              className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition ${
                tab === 'morning'
                  ? 'bg-[#06C755] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              06:00 เช้า (Daily Brief)
            </button>
            <button
              onClick={() => setTab('closing')}
              className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition ${
                tab === 'closing'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              18:00 เย็น (Closing Report)
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {/* Timestamp */}
            <div className="text-center">
              <span className="bg-black/20 text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                {tab === 'morning' ? 'วันนี้ 06:00 น.' : 'วันนี้ 18:00 น.'}
              </span>
            </div>

            {/* Simulated Chat Bubble */}
            <div className="flex items-start space-x-2">
              <div className="w-7 h-7 rounded-full bg-emerald-600 border border-white text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                สสจ.
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow text-[11px] max-w-[85%] space-y-1.5">
                <pre className="font-thai whitespace-pre-wrap text-slate-800 leading-relaxed font-normal">
                  {activeText}
                </pre>
              </div>
            </div>
          </div>

          {/* LINE Bottom Bar / Action */}
          <div className="bg-white p-2.5 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'คัดลอกแล้ว!' : 'คัดลอกข้อความ'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white text-xs font-bold transition shadow"
            >
              ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
