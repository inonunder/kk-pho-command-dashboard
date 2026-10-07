import React from 'react';
import { ShieldAlert, ArrowRight } from 'lucide-react';

interface RiskStats {
  critical: number;
  high: number;
  medium: number;
  normal: number;
}

interface RiskEngineWidgetProps {
  stats: RiskStats;
  totalTasks: number;
  onFilterRisk: (risk: string) => void;
  onViewAllAttention: () => void;
}

export const RiskEngineWidget: React.FC<RiskEngineWidgetProps> = ({
  stats,
  totalTasks,
  onFilterRisk,
  onViewAllAttention
}) => {
  // SVG Donut calculation
  // Total 128
  const cP = (stats.critical / totalTasks) * 100;
  const hP = (stats.high / totalTasks) * 100;
  const mP = (stats.medium / totalTasks) * 100;
  const nP = (stats.normal / totalTasks) * 100;

  // Dash offsets
  const circumference = 2 * Math.PI * 15.9155; // ~100
  const cOffset = 0;
  const hOffset = -cP;
  const mOffset = -(cP + hP);
  const nOffset = -(cP + hP + mP);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 flex flex-col justify-between h-full">
      <div>
        {/* Title */}
        <div className="flex items-center space-x-2 mb-2.5">
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-800">สถานะงานตาม Risk Engine</h3>
        </div>

        {/* Donut Chart & Legend */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Donut Chart */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              {/* Background */}
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="4" />
              {/* Critical - Red */}
              <circle
                cx="18" cy="18" r="15.9155" fill="none" stroke="#ef4444" strokeWidth="4"
                strokeDasharray={`${cP} 100`} strokeDashoffset={cOffset}
              />
              {/* High - Orange */}
              <circle
                cx="18" cy="18" r="15.9155" fill="none" stroke="#f97316" strokeWidth="4"
                strokeDasharray={`${hP} 100`} strokeDashoffset={hOffset}
              />
              {/* Medium - Yellow */}
              <circle
                cx="18" cy="18" r="15.9155" fill="none" stroke="#eab308" strokeWidth="4"
                strokeDasharray={`${mP} 100`} strokeDashoffset={mOffset}
              />
              {/* Normal - Green */}
              <circle
                cx="18" cy="18" r="15.9155" fill="none" stroke="#22c55e" strokeWidth="4"
                strokeDasharray={`${nP} 100`} strokeDashoffset={nOffset}
              />
            </svg>
            <div className="absolute text-center leading-none">
              <span className="text-[10px] text-slate-400 block font-light">ทั้งหมด</span>
              <span className="text-sm font-extrabold text-slate-800">{totalTasks}</span>
              <span className="text-[9px] text-slate-500 block">งาน</span>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-1 text-[11px] flex-1 pl-1">
            <div 
              onClick={() => onFilterRisk('CRITICAL')} 
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1 py-0.5 rounded transition"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                <span className="text-slate-700">Critical (เกินกำหนด)</span>
              </div>
              <span className="font-bold text-rose-600">{stats.critical}</span>
            </div>

            <div 
              onClick={() => onFilterRisk('HIGH')} 
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1 py-0.5 rounded transition"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0"></span>
                <span className="text-slate-700">High (≤ 2 วัน)</span>
              </div>
              <span className="font-bold text-orange-600">{stats.high}</span>
            </div>

            <div 
              onClick={() => onFilterRisk('MEDIUM')} 
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1 py-0.5 rounded transition"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                <span className="text-slate-700">Medium (3–7 วัน)</span>
              </div>
              <span className="font-bold text-amber-600">{stats.medium}</span>
            </div>

            <div 
              onClick={() => onFilterRisk('NORMAL')} 
              className="flex items-center justify-between cursor-pointer hover:bg-slate-50 px-1 py-0.5 rounded transition"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="text-slate-700">Normal (&gt; 7 วัน)</span>
              </div>
              <span className="font-bold text-emerald-600">{stats.normal}</span>
            </div>
          </div>
        </div>

        {/* Section: ประเด็นที่ต้องสั่งการ */}
        <div className="border-t border-slate-100 pt-2.5">
          <div className="text-[11px] font-bold text-slate-700 mb-1.5">
            ประเด็นที่ต้องสั่งการ
          </div>
          <div className="flex items-center gap-2">
            <div 
              onClick={() => onFilterRisk('CRITICAL')}
              className="flex-1 bg-rose-50 border border-rose-200 rounded-xl p-2 text-center cursor-pointer hover:bg-rose-100/70 transition"
            >
              <div className="text-lg font-black text-rose-600 leading-none">{stats.critical}</div>
              <div className="text-[10px] text-rose-700 font-medium mt-0.5">งานต้องเร่งรัด</div>
            </div>

            <div 
              onClick={() => onFilterRisk('HIGH')}
              className="flex-1 bg-amber-50 border border-amber-200 rounded-xl p-2 text-center cursor-pointer hover:bg-amber-100/70 transition"
            >
              <div className="text-lg font-black text-amber-600 leading-none">{stats.high}</div>
              <div className="text-[10px] text-amber-700 font-medium mt-0.5">งานใกล้ครบกำหนด</div>
            </div>

            <button
              onClick={onViewAllAttention}
              className="p-2.5 bg-navy-900 text-white hover:bg-navy-800 rounded-xl flex items-center justify-center shrink-0 transition shadow-sm"
              title="ดูรายการประเด็นสั่งการทั้งหมด"
            >
              <span className="text-xs font-semibold px-1">ดูทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
