import React from 'react';
import { WorkstreamType, Task } from '../../types';
import { WORKSTREAMS } from '../../data/seedData';
import { WorkTrackingTable } from '../dashboard/WorkTrackingTable';
import { 
  ClipboardList, 
  CircleDollarSign, 
  CheckSquare, 
  Database,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';

interface WorkstreamDetailViewProps {
  wsId: WorkstreamType;
  tasks: Task[];
  onSelectTask: (task: Task) => void;
}

export const WorkstreamDetailView: React.FC<WorkstreamDetailViewProps> = ({
  wsId,
  tasks,
  onSelectTask
}) => {
  const wsInfo = WORKSTREAMS.find(w => w.id === wsId) || WORKSTREAMS[0];
  const wsTasks = tasks.filter(t => t.workstreamId === wsId);

  const completed = wsTasks.filter(t => t.status === 'COMPLETED').length;
  const inProgress = wsTasks.filter(t => t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED').length;
  const overdue = wsTasks.filter(t => t.status === 'OVERDUE').length;

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Workstream Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-navy-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow">
              {wsInfo.code}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">{wsInfo.name}</h2>
              <p className="text-xs text-slate-500">{wsInfo.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wsInfo.tags.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Workstream Quick KPIs */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-center">
            <div className="text-xl font-black text-emerald-600">{completed}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">ดำเนินการแล้ว</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5 text-center">
            <div className="text-xl font-black text-blue-600">{inProgress}</div>
            <div className="text-[10px] text-blue-700 font-semibold mt-0.5">กำลังดำเนินการ</div>
          </div>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-center">
            <div className="text-xl font-black text-rose-600">{overdue}</div>
            <div className="text-[10px] text-rose-700 font-semibold mt-0.5">เกินกำหนด</div>
          </div>
        </div>
      </div>

      {/* Filtered Table for this workstream */}
      <WorkTrackingTable
        tasks={wsTasks}
        onSelectTask={onSelectTask}
        workstreamFilterPreset={wsId}
      />
    </div>
  );
};
