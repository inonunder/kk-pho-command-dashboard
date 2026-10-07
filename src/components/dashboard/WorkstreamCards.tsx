import React from 'react';
import { WORKSTREAMS } from '../../data/seedData';
import { WorkstreamType } from '../../types';
import { 
  ClipboardList, 
  CircleDollarSign, 
  CheckSquare, 
  Database, 
  ArrowRight,
  CheckCircle,
  Clock,
  Hourglass,
  AlertCircle
} from 'lucide-react';

interface WorkstreamStats {
  plan: { total: number; completed: number; inProgress: number; dueSoon: number; overdue: number };
  budget: { total: number; completed: number; inProgress: number; dueSoon: number; overdue: number };
  supervision: { total: number; completed: number; inProgress: number; dueSoon: number; overdue: number };
  data: { total: number; completed: number; inProgress: number; dueSoon: number; overdue: number };
}

interface WorkstreamCardsProps {
  stats: WorkstreamStats;
  onSelectWorkstream: (wsId: WorkstreamType) => void;
}

export const WorkstreamCards: React.FC<WorkstreamCardsProps> = ({ stats, onSelectWorkstream }) => {
  const getIcon = (id: WorkstreamType) => {
    switch (id) {
      case 'plan': return ClipboardList;
      case 'budget': return CircleDollarSign;
      case 'supervision': return CheckSquare;
      case 'data': return Database;
    }
  };

  const getGradientHeader = (id: WorkstreamType) => {
    switch (id) {
      case 'plan': return 'from-[#1a4480] to-[#2563eb]';
      case 'budget': return 'from-[#1b7a42] to-[#22c55e]';
      case 'supervision': return 'from-[#b46d0a] to-[#f59e0b]';
      case 'data': return 'from-[#65249a] to-[#a855f7]';
    }
  };

  const getButtonBg = (id: WorkstreamType) => {
    switch (id) {
      case 'plan': return 'bg-[#1e58b8] hover:bg-[#1a4480]';
      case 'budget': return 'bg-[#1b7a42] hover:bg-[#156033]';
      case 'supervision': return 'bg-[#b46d0a] hover:bg-[#925407]';
      case 'data': return 'bg-[#742ea8] hover:bg-[#5b2285]';
    }
  };

  return (
    <div className="mb-4">
      {/* Title Bar */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="p-1 rounded-md bg-navy-800 text-amber-400">
            <ClipboardList className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-slate-800">4 ขางานหลัก</h2>
          <span className="text-xs text-slate-400 hidden sm:inline">|</span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            แผนงาน/โครงการ | งบประมาณ | นิเทศติดตาม | ข้อมูล
          </span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {WORKSTREAMS.map((ws) => {
          const Icon = getIcon(ws.id);
          const s = stats[ws.id];
          const headerGradient = getGradientHeader(ws.id);
          const btnBg = getButtonBg(ws.id);

          return (
            <div
              key={ws.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              {/* Header Card Banner */}
              <div className={`bg-gradient-to-r ${headerGradient} p-3 text-white flex items-center justify-between`}>
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center font-mono font-bold text-xs border border-white/30">
                    {ws.code}
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight drop-shadow-sm">{ws.name}</div>
                    <div className="text-lg font-black leading-tight drop-shadow-sm">{s.total} <span className="text-xs font-normal opacity-90">งาน</span></div>
                  </div>
                </div>
                <div className="opacity-40">
                  <Icon className="w-7 h-7" />
                </div>
              </div>

              {/* Status Counters */}
              <div className="p-3 space-y-1.5 text-xs">
                <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                  <span className="flex items-center text-slate-600 gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    เสร็จแล้ว
                  </span>
                  <span className="font-bold text-slate-800">{s.completed}</span>
                </div>
                <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                  <span className="flex items-center text-slate-600 gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    กำลังดำเนินการ
                  </span>
                  <span className="font-bold text-slate-800">{s.inProgress}</span>
                </div>
                <div className="flex items-center justify-between py-0.5 border-b border-slate-100">
                  <span className="flex items-center text-slate-600 gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    ใกล้ครบกำหนด
                  </span>
                  <span className="font-bold text-amber-600">{s.dueSoon}</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span className="flex items-center text-slate-600 gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    เกินกำหนด
                  </span>
                  <span className="font-bold text-rose-600">{s.overdue}</span>
                </div>

                {/* Drill Down Button */}
                <button
                  onClick={() => onSelectWorkstream(ws.id)}
                  className={`w-full mt-2 py-1.5 px-3 rounded-xl text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm ${btnBg}`}
                >
                  <span>ดูรายละเอียด</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* Sub-tags */}
                <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                  {ws.tags.map((tag, idx) => (
                    <div key={idx} className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                      <span className="text-slate-400">›</span>
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
