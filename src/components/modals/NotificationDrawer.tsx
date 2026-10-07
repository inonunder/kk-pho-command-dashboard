import React from 'react';
import { SystemNotification } from '../../types';
import { Bell, X, Check, AlertTriangle, Calendar, Clock, Bot } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllRead: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-navy-950/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInRight">
        {/* Header */}
        <div className="bg-navy-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-sm">การแจ้งเตือน (Notifications)</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-3 overflow-y-auto flex-1 space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3 rounded-2xl border transition text-xs space-y-1 ${
                notif.isRead ? 'bg-slate-50 border-slate-200' : 'bg-blue-50/60 border-blue-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  {notif.type === 'OVERDUE' && <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />}
                  {notif.type === 'MEETING' && <Calendar className="w-3.5 h-3.5 text-blue-600" />}
                  {notif.type === 'DEADLINE' && <Clock className="w-3.5 h-3.5 text-amber-600" />}
                  {notif.type === 'ASSIGNMENT' && <Bot className="w-3.5 h-3.5 text-purple-600" />}
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{notif.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onMarkAllRead}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
          >
            อ่านทั้งหมดแล้ว
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold"
          >
            ปิด
          </button>
        </div>
      </div>
    </div>
  );
};
