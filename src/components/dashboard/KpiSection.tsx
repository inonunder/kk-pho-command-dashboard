import React from 'react';
import { 
  FileText, 
  Target, 
  Clock, 
  Hourglass, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';

interface KpiStats {
  documentsCount: number;
  ordersCount: number;
  totalTasks: number;
  completed: number;
  inProgress: number;
  dueSoon: number;
  overdue: number;
  completionRate: number;
}

interface KpiSectionProps {
  stats: KpiStats;
  onFilterClick?: (statusFilter: string) => void;
}

export const KpiSection: React.FC<KpiSectionProps> = ({ stats, onFilterClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-4">
      {/* 1. หนังสือเข้า (หลังเกษียณ) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-slate-700">หนังสือเข้า</div>
            <div className="text-[10px] text-slate-400 font-light">(หลังเกษียณ)</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-slate-800 tracking-tight">{stats.documentsCount}</span>
            <span className="text-xs text-slate-500 font-medium">ฉบับ</span>
          </div>
          <div className="flex items-center text-[10px] text-emerald-600 font-semibold mt-0.5">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>12% จากเดือนที่แล้ว</span>
          </div>
        </div>
      </div>

      {/* 2. ข้อสั่งการ ทั้งหมด */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-slate-700">ข้อสั่งการ</div>
            <div className="text-[10px] text-slate-400 font-light">ทั้งหมด</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-slate-800 tracking-tight">{stats.ordersCount}</span>
            <span className="text-xs text-slate-500 font-medium">รายการ</span>
          </div>
          <div className="flex items-center text-[10px] text-emerald-600 font-semibold mt-0.5">
            <TrendingUp className="w-3 h-3 mr-0.5" />
            <span>8% จากเดือนที่แล้ว</span>
          </div>
        </div>
      </div>

      {/* 3. กำลังดำเนินการ */}
      <div 
        onClick={() => onFilterClick && onFilterClick('IN_PROGRESS')}
        className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-cyan-300 flex flex-col justify-between"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-slate-700">กำลังดำเนินการ</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-cyan-700 tracking-tight">{stats.inProgress}</span>
            <span className="text-xs text-slate-500 font-medium">รายการ</span>
          </div>
          <div className="text-[10px] text-cyan-600 font-semibold mt-0.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-1"></span>
            <span>21.1%</span>
          </div>
        </div>
      </div>

      {/* 4. ใกล้ครบกำหนด */}
      <div 
        onClick={() => onFilterClick && onFilterClick('DUE_SOON')}
        className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-amber-300 flex flex-col justify-between"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <Hourglass className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-slate-700">ใกล้ครบกำหนด</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-amber-600 tracking-tight">{stats.dueSoon}</span>
            <span className="text-xs text-slate-500 font-medium">รายการ</span>
          </div>
          <div className="text-[10px] text-amber-600 font-semibold mt-0.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1"></span>
            <span>9.4%</span>
          </div>
        </div>
      </div>

      {/* 5. เกินกำหนด */}
      <div 
        onClick={() => onFilterClick && onFilterClick('OVERDUE')}
        className="bg-white rounded-2xl p-3 border border-rose-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-rose-400 bg-gradient-to-b from-white to-rose-50/20 flex flex-col justify-between"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 flex items-center justify-center shrink-0 animate-pulse">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-rose-700">เกินกำหนด</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-rose-600 tracking-tight">{stats.overdue}</span>
            <span className="text-xs text-slate-500 font-medium">รายการ</span>
          </div>
          <div className="text-[10px] text-rose-600 font-semibold mt-0.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1"></span>
            <span>5.5%</span>
          </div>
        </div>
      </div>

      {/* 6. ปิดงานแล้ว */}
      <div 
        onClick={() => onFilterClick && onFilterClick('COMPLETED')}
        className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm hover:shadow-md transition-all cursor-pointer hover:border-emerald-300 flex flex-col justify-between"
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold text-slate-700">ปิดงานแล้ว</div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline space-x-1.5">
            <span className="text-2xl font-black text-emerald-600 tracking-tight">{stats.completed}</span>
            <span className="text-xs text-slate-500 font-medium">รายการ</span>
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1"></span>
            <span>73.4%</span>
          </div>
        </div>
      </div>

      {/* 7. สรุปภาพรวมการดำเนินงาน (Ring Progress Widget) */}
      <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-sm flex flex-col justify-between">
        <div className="text-[11px] font-bold text-slate-700 leading-tight">
          สรุปภาพรวมการดำเนินงาน
        </div>
        <div className="flex items-center justify-between gap-1.5 mt-1">
          {/* Progress Circle */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${stats.completionRate}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-[11px] font-black text-slate-700">
              {stats.completionRate}%
            </div>
          </div>

          <div className="text-[10px] leading-tight space-y-0.5">
            <div className="text-slate-500">
              งานทั้งหมด <span className="font-bold text-slate-800">{stats.totalTasks}</span> รายการ
            </div>
            <div className="text-emerald-600 font-medium">
              ดำเนินการแล้ว <span className="font-bold">{stats.completed}</span> รายการ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
