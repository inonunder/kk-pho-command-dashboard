import React, { useState } from 'react';
import { Task, TaskStatus } from '../../types';
import { WorkTrackingTable } from '../dashboard/WorkTrackingTable';
import { 
  KanbanSquare, 
  Table as TableIcon, 
  Clock, 
  Plus, 
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface WorkTrackingViewProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
}

export const WorkTrackingView: React.FC<WorkTrackingViewProps> = ({
  tasks,
  onSelectTask,
  onUpdateTaskStatus
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban' | 'timeline'>('kanban');

  const kanbanColumns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'WAITING', label: 'รอรับเรื่อง', color: 'border-slate-300 bg-slate-50' },
    { id: 'ASSIGNED', label: 'รับเรื่องแล้ว', color: 'border-blue-300 bg-blue-50/50' },
    { id: 'IN_PROGRESS', label: 'กำลังดำเนินการ', color: 'border-cyan-300 bg-cyan-50/50' },
    { id: 'WAITING_INFORMATION', label: 'รอข้อมูล/ประสาน', color: 'border-amber-300 bg-amber-50/50' },
    { id: 'BLOCKED', label: 'ติดปัญหา', color: 'border-purple-300 bg-purple-50/50' },
    { id: 'COMPLETED', label: 'ดำเนินการแล้ว', color: 'border-emerald-300 bg-emerald-50/50' },
  ];

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Header with Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <KanbanSquare className="w-5 h-5 text-blue-600" />
            <span>ระบบติดตามงานกลาง (Central Work Tracking)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            สลับมุมมอง Table, Kanban และ Timeline เพื่อการบริหารข้อสั่งการอย่างมีประสิทธิภาพ
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <KanbanSquare className="w-4 h-4" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span>ตาราง (Table)</span>
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {kanbanColumns.map((col) => {
            const colTasks = tasks.filter((t) => {
              if (col.id === 'IN_PROGRESS') {
                return t.status === 'IN_PROGRESS' || t.status === 'OVERDUE';
              }
              return t.status === col.id;
            });

            return (
              <div
                key={col.id}
                className={`rounded-2xl border p-3 flex flex-col min-h-[500px] ${col.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-800">{col.label}</h4>
                  <span className="w-5 h-5 rounded-full bg-white text-slate-700 font-bold text-[10px] flex items-center justify-center shadow-sm">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      className="bg-white rounded-xl p-3 border border-slate-200 shadow-sm hover:shadow-md transition cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                          {task.code}
                        </span>
                        {task.status === 'OVERDUE' && (
                          <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            เกินกำหนด
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-bold text-slate-800 line-clamp-2">
                        {task.title}
                      </div>

                      <div className="text-[10px] text-slate-500 space-y-0.5">
                        <div className="truncate">👤 {task.primaryAssignee}</div>
                        <div className="text-rose-600 font-medium">📅 {task.deadline}</div>
                      </div>

                      <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">ความคืบหน้า</span>
                        <span className="font-bold text-blue-600">{task.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <WorkTrackingTable
          tasks={tasks}
          onSelectTask={onSelectTask}
        />
      )}
    </div>
  );
};
