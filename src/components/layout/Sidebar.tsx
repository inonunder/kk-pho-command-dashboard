import React from 'react';
import { 
  LayoutDashboard, 
  FileUp, 
  FileText, 
  ClipboardList, 
  CircleDollarSign, 
  CheckSquare, 
  Database, 
  KanbanSquare, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export type NavItemKey = 
  | 'dashboard'
  | 'upload_doc'
  | 'orders'
  | 'ws_plan'
  | 'ws_budget'
  | 'ws_supervision'
  | 'ws_data'
  | 'work_tracking'
  | 'calendar'
  | 'personnel'
  | 'reports'
  | 'settings';

interface SidebarProps {
  currentView: NavItemKey;
  onNavigate: (view: NavItemKey) => void;
  collapsed?: boolean;
}

interface NavItem {
  key: NavItemKey;
  label: string;
  sub: string;
  icon: React.ElementType;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, collapsed = false }) => {
  const navItems: NavItem[] = [
    { key: 'dashboard', label: 'หน้าหลัก', sub: 'Executive Dashboard', icon: LayoutDashboard },
    { key: 'upload_doc', label: 'รับหนังสือราชการ', sub: 'Upload / วิเคราะห์ AI', icon: FileUp, highlight: true },
    { key: 'orders', label: 'ข้อสั่งการ', sub: 'รายการข้อสั่งการทั้งหมด', icon: FileText },
    { key: 'ws_plan', label: 'แผนงาน/โครงการ', sub: 'งานในสายแผนงานและโครงการ', icon: ClipboardList },
    { key: 'ws_budget', label: 'งบประมาณ', sub: 'งานในสายงบประมาณ', icon: CircleDollarSign },
    { key: 'ws_supervision', label: 'นิเทศติดตาม', sub: 'งานในสายนิเทศติดตาม', icon: CheckSquare },
    { key: 'ws_data', label: 'ข้อมูล', sub: 'งานในสายข้อมูล', icon: Database },
    { key: 'work_tracking', label: 'Work Tracking', sub: 'ติดตามงานทั้งหมด', icon: KanbanSquare },
    { key: 'calendar', label: 'ปฏิทินกลาง', sub: 'ประชุม/นัดหมาย/กิจกรรม', icon: Calendar },
    { key: 'personnel', label: 'บุคลากร', sub: 'ข้อมูลผู้รับผิดชอบ', icon: Users },
    { key: 'reports', label: 'รายงาน', sub: 'สรุปผล/สถิติ', icon: BarChart3 },
    { key: 'settings', label: 'ตั้งค่าระบบ', sub: 'จัดการผู้ใช้/ข้อมูลพื้นฐาน', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a192f] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none min-h-[calc(100vh-65px)]">
      {/* Navigation Menu */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.key;
          const Icon = item.icon;

          if (isActive) {
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key as NavItemKey)}
                className="w-full text-left bg-gradient-to-r from-[#e7c992] to-[#d6b16e] text-[#0a192f] font-semibold rounded-xl px-3 py-2.5 shadow-md flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="p-1 rounded-lg bg-[#0a192f]/15">
                    <Icon className="w-5 h-5 text-[#0a192f]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">{item.label}</div>
                    <div className="text-[10px] text-[#0a192f]/80 font-normal">{item.sub}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#0a192f]/70" />
              </button>
            );
          }

          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key as NavItemKey)}
              className="w-full text-left hover:bg-slate-800/80 hover:text-white text-slate-300 rounded-xl px-3 py-2 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1 rounded-lg text-slate-400 group-hover:text-amber-400 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-medium leading-tight group-hover:text-white flex items-center gap-1.5">
                    {item.label}
                    {item.highlight && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-semibold text-amber-300 bg-amber-500/20 rounded border border-amber-500/30">
                        <Sparkles className="w-2.5 h-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-light truncate max-w-[145px]">
                    {item.sub}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Inspiration Card as in Mockup */}
      <div className="p-3 m-2 rounded-xl bg-gradient-to-br from-navy-800 to-[#122e54] border border-amber-500/20 text-center relative overflow-hidden shadow-inner">
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
        <p className="text-xs text-amber-300 font-medium italic leading-relaxed">
          ร่วมกันขับเคลื่อน<br />
          <span className="font-bold text-white text-sm">สาธารณสุขขอนแก่น</span><br />
          ให้ดียิ่งขึ้น
        </p>
        <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-center gap-2 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>ระบบออนไลน์ • AI พร้อมทำงาน</span>
        </div>
      </div>
    </aside>
  );
};
