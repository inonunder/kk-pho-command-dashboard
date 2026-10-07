import React from 'react';
import { USERS } from '../../data/seedData';
import { Task } from '../../types';
import { Users, Mail, Phone, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface PersonnelViewProps {
  tasks: Task[];
}

export const PersonnelView: React.FC<PersonnelViewProps> = ({ tasks }) => {
  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>ข้อมูลบุคลากรและภาระงาน (Personnel &amp; Workload Intelligence)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          ตรวจสอบการกระจายงาน ความรับผิดชอบ และผลสัมฤทธิ์ของเจ้าหน้าที่แต่ละกลุ่มงาน
        </p>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {USERS.map((user) => {
          const userTasks = tasks.filter(t => t.primaryAssignee.includes(user.name.split(' ')[0]) || t.primaryAssigneeId === user.id);
          const completedCount = userTasks.filter(t => t.status === 'COMPLETED').length;
          const activeCount = userTasks.filter(t => t.status !== 'COMPLETED').length;
          const overdueCount = userTasks.filter(t => t.status === 'OVERDUE').length;

          return (
            <div key={user.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3 hover:shadow-md transition">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy-800 to-blue-600 text-white font-bold text-base flex items-center justify-center shadow">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 leading-tight">{user.name}</h3>
                  <div className="text-[11px] text-slate-500 mt-0.5">{user.position}</div>
                  <div className="text-[10px] text-blue-700 font-semibold">{user.department}</div>
                </div>
              </div>

              {/* Workload Stats */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">กำลังทำ</span>
                  <span className="font-bold text-blue-600">{activeCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">เสร็จแล้ว</span>
                  <span className="font-bold text-emerald-600">{completedCount}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">เกินกำหนด</span>
                  <span className="font-bold text-rose-600">{overdueCount}</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" />
                  {user.phone}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
