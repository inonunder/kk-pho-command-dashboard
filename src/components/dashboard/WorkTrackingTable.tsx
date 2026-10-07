import React, { useState, useMemo } from 'react';
import { Task, WorkstreamType, TaskStatus, RiskLevel } from '../../types';
import { ExportService } from '../../services/exportService';
import { 
  Search, 
  FileSpreadsheet, 
  FileText, 
  Paperclip, 
  ExternalLink, 
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

interface WorkTrackingTableProps {
  tasks: Task[];
  onSelectTask: (task: Task) => void;
  statusFilterPreset?: string;
  riskFilterPreset?: string;
  workstreamFilterPreset?: WorkstreamType;
}

export const WorkTrackingTable: React.FC<WorkTrackingTableProps> = ({
  tasks,
  onSelectTask,
  statusFilterPreset,
  riskFilterPreset,
  workstreamFilterPreset
}) => {
  const [search, setSearch] = useState('');
  const [selectedWs, setSelectedWs] = useState<string>(workstreamFilterPreset || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>(statusFilterPreset || 'ALL');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('ALL');

  // Sync external filters if changed
  React.useEffect(() => {
    if (statusFilterPreset) setSelectedStatus(statusFilterPreset);
  }, [statusFilterPreset]);

  React.useEffect(() => {
    if (workstreamFilterPreset) setSelectedWs(workstreamFilterPreset);
  }, [workstreamFilterPreset]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.description.toLowerCase().includes(search.toLowerCase()) && !t.primaryAssignee.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (selectedWs !== 'ALL' && t.workstreamId !== selectedWs) {
        return false;
      }
      if (selectedStatus !== 'ALL') {
        if (selectedStatus === 'DUE_SOON') {
          if (t.risk !== 'HIGH' && t.risk !== 'MEDIUM') return false;
        } else if (t.status !== selectedStatus) {
          return false;
        }
      }
      if (riskFilterPreset && t.risk !== riskFilterPreset) {
        return false;
      }
      if (selectedDept !== 'ALL' && !t.department.includes(selectedDept)) {
        return false;
      }
      if (selectedAssignee !== 'ALL' && !t.primaryAssignee.includes(selectedAssignee)) {
        return false;
      }
      return true;
    });
  }, [tasks, search, selectedWs, selectedStatus, selectedDept, selectedAssignee, riskFilterPreset]);

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'OVERDUE':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">เกินกำหนด</span>;
      case 'ASSIGNED':
      case 'IN_PROGRESS':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200">กำลังดำเนินการ</span>;
      case 'COMPLETED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">เสร็จแล้ว</span>;
      case 'WAITING':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">รอรับเรื่อง</span>;
      case 'BLOCKED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 border border-purple-200">ติดปัญหา</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">สูงมาก</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-200">สูง</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">ปานกลาง</span>;
      case 'NORMAL':
        return <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">ต่ำ</span>;
    }
  };

  const getWorkstreamLabel = (id: WorkstreamType) => {
    switch (id) {
      case 'plan': return { label: 'แผน', color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'budget': return { label: 'งบประมาณ', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'supervision': return { label: 'นิเทศ', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'data': return { label: 'ข้อมูล', color: 'text-purple-700 bg-purple-50 border-purple-200' };
    }
  };

  const formatThaiDate = (dateStr: string) => {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const day = parseInt(parts[2], 10);
      const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
      const month = months[parseInt(parts[1], 10) - 1];
      const year = (parseInt(parts[0], 10) + 543).toString().slice(2);
      return `${day} ${month} ${year}`;
    }
    return dateStr;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 mb-4">
      {/* Title & Filters Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
        {/* Title */}
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-navy-900 text-white">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">WORK TRACKING (งานทั้งหมด)</h3>
            <span className="text-[10px] text-slate-400">แสดงผล {filteredTasks.length} รายการ</span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative min-w-[160px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหา..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Workstream Filter */}
          <select
            value={selectedWs}
            onChange={(e) => setSelectedWs(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
          >
            <option value="ALL">สายงานทั้งหมด</option>
            <option value="plan">แผนงาน/โครงการ</option>
            <option value="budget">งบประมาณ</option>
            <option value="supervision">นิเทศติดตาม</option>
            <option value="data">ข้อมูล</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
          >
            <option value="ALL">สถานะทั้งหมด</option>
            <option value="IN_PROGRESS">กำลังดำเนินการ</option>
            <option value="OVERDUE">เกินกำหนด</option>
            <option value="DUE_SOON">ใกล้ครบกำหนด</option>
            <option value="COMPLETED">เสร็จแล้ว</option>
          </select>

          {/* Assignee Filter */}
          <select
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
          >
            <option value="ALL">ผู้รับผิดชอบทั้งหมด</option>
            <option value="สมชาย">นายสมชาย</option>
            <option value="จุฬารัตน์">นางสาวจุฬารัตน์</option>
            <option value="ยิ่งยศ">นายยิ่งยศ</option>
            <option value="กนกวรรณ">นางสาวกนกวรรณ</option>
          </select>

          {/* Export Buttons */}
          <div className="flex items-center space-x-1.5 ml-auto">
            <button
              onClick={() => ExportService.exportTasksToCSV(filteredTasks, 'KK-PHO_WorkTracking.csv')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 transition"
              title="ส่งออกไฟล์ CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>CSV</span>
            </button>
            <button
              onClick={() => ExportService.exportTasksToCSV(filteredTasks, 'KK-PHO_WorkTracking.csv')}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow-sm"
              title="ส่งออกไฟล์ Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600">
            <tr>
              <th className="py-2.5 px-3 w-8 text-center">
                <input type="checkbox" className="rounded text-blue-600" />
              </th>
              <th className="py-2.5 px-3">สถานะ</th>
              <th className="py-2.5 px-3">งาน / ข้อสั่งการ</th>
              <th className="py-2.5 px-3">สายงาน</th>
              <th className="py-2.5 px-3">กลุ่มงาน</th>
              <th className="py-2.5 px-3">ผู้รับผิดชอบ</th>
              <th className="py-2.5 px-3">กำหนดส่ง</th>
              <th className="py-2.5 px-3 w-32">ความคืบหน้า</th>
              <th className="py-2.5 px-3">ความเสี่ยง</th>
              <th className="py-2.5 px-3 text-center">หลักฐาน</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-slate-400">
                  ไม่พบรายการงานตามเงื่อนไขที่เลือก
                </td>
              </tr>
            ) : (
              filteredTasks.map((t) => {
                const ws = getWorkstreamLabel(t.workstreamId);
                return (
                  <tr
                    key={t.id}
                    onClick={() => onSelectTask(t)}
                    className="hover:bg-blue-50/40 transition cursor-pointer group"
                  >
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="rounded text-blue-600" />
                    </td>
                    <td className="py-2.5 px-3">
                      {getStatusBadge(t.status)}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors flex items-center gap-1">
                        <span>{t.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <span>{t.sourceDocumentNo}</span>
                        <span>•</span>
                        <span>{t.code}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${ws.color}`}>
                        {ws.label}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">
                      {t.department}
                    </td>
                    <td className="py-2.5 px-3 text-slate-800 font-medium">
                      {t.primaryAssignee}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium whitespace-nowrap">
                      {formatThaiDate(t.deadline)}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              t.progress === 100
                                ? 'bg-emerald-500'
                                : t.status === 'OVERDUE'
                                ? 'bg-rose-500'
                                : 'bg-blue-500'
                            }`}
                            style={{ width: `${t.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 w-8 text-right">
                          {t.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      {getRiskBadge(t.risk)}
                    </td>
                    <td className="py-2.5 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      {t.evidence && t.evidence.length > 0 ? (
                        <button
                          onClick={() => onSelectTask(t)}
                          className="p-1 rounded hover:bg-slate-100 text-blue-600"
                          title={`มีหลักฐานแนบ ${t.evidence.length} ไฟล์`}
                        >
                          <Paperclip className="w-3.5 h-3.5 inline" />
                        </button>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
