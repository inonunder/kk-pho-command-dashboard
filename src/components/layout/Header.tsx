import React, { useState, useEffect } from 'react';
import { UserRole } from '../../types';
import { AppStorage } from '../../services/storage';
import { CloudSun, Shield, UserCheck, Bell } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenNotifications,
  unreadCount
}) => {
  const [time, setTime] = useState<string>('08:45');
  const [seconds, setSeconds] = useState<string>('00');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
      setSeconds(now.getSeconds().toString().padStart(2, '0'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#07172b] via-[#0d2342] to-[#122c54] text-white border-b border-navy-700/60 shadow-lg relative z-20">
      <div className="px-4 py-2.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Emblem & Office Title */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-emerald-800/80 border-2 border-emerald-400/70 p-1 flex items-center justify-center shadow-md">
            {/* Ministry of Public Health Emblem SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-100 fill-current">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
              <path d="M50 15 L50 85 M25 50 L75 50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="18" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <path d="M42 30 C45 22, 55 22, 58 30 C62 40, 38 60, 50 72" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>สำนักงานสาธารณสุขจังหวัดขอนแก่น</span>
            </div>
            <div className="text-[10px] tracking-wider text-slate-300 uppercase font-light">
              KHON KAEN PROVINCIAL PUBLIC HEALTH OFFICE
            </div>
          </div>
        </div>

        {/* Center: System Title & Vision Tagline */}
        <div className="text-center flex-1 max-w-3xl hidden md:block">
          <h1 className="text-lg lg:text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-sm">
            KK-PHO EXECUTIVE COMMAND & TRACKING DASHBOARD
          </h1>
          <div className="text-xs font-medium text-amber-200/90 mt-0.5">
            ศูนย์บริหารข้อสั่งการและติดตามงาน หลังเกษียณหนังสือ นพ.สสจ.
          </div>
          <p className="text-[11px] text-slate-300 italic tracking-wide mt-0.5">
            “ทุกหนังสือ คือ ข้อสั่งการ ทุกข้อสั่งการ คือ งาน ทุกงาน คือ ผลลัพธ์ของประชาชน”
          </p>
        </div>

        {/* Right: Date, Live Time, Weather & User Role Switcher */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <button 
            onClick={onOpenNotifications}
            className="relative p-2 rounded-lg bg-navy-800/80 hover:bg-navy-700 text-slate-300 hover:text-white transition-colors border border-navy-600/50"
            title="การแจ้งเตือน"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Date & Weather */}
          <div className="hidden sm:flex flex-col items-end text-right border-l border-slate-700/60 pl-3">
            <div className="text-xs text-slate-300 font-medium">7 ตุลาคม 2569</div>
            <div className="flex items-center gap-1 text-[11px] text-amber-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>อ.เมืองขอนแก่น 28°C</span>
            </div>
          </div>

          {/* Live Digital Clock */}
          <div className="bg-navy-900/90 border border-amber-500/30 rounded-lg px-3 py-1 text-center shadow-inner">
            <div className="text-lg font-mono font-bold text-amber-400 leading-tight">
              {time}
              <span className="text-xs text-amber-500/80 font-normal ml-0.5">:{seconds}</span>
            </div>
            <div className="text-[9px] uppercase tracking-wider text-slate-400">เวลาปัจจุบัน</div>
          </div>

          {/* Role Switcher for Demo & Security */}
          <div className="relative">
            <select
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="bg-navy-800 text-white text-xs rounded-lg px-2.5 py-1.5 border border-amber-500/40 hover:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer transition font-medium"
              title="สลับบทบาทผู้ใช้งานเพื่อทดสอบ RBAC"
            >
              <option value="EXECUTIVE">👑 นพ.สสจ. (ผู้บริหาร)</option>
              <option value="SUPER_ADMIN">⚙️ ผู้ดูแลระบบ (Super Admin)</option>
              <option value="WORKSTREAM_MANAGER">📊 หัวหน้าขางาน (Manager)</option>
              <option value="SUPERVISOR">📋 หัวหน้ากลุ่มงาน (Supervisor)</option>
              <option value="STAFF">👤 เจ้าหน้าที่ผู้รับผิดชอบ (Staff)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
