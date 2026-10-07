import React, { useState } from 'react';
import { Task, TaskStatus, TaskUpdate, EvidenceFile, WorkstreamType } from '../../types';
import { 
  X, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Paperclip, 
  Send, 
  Calendar, 
  User, 
  Building2, 
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  History
} from 'lucide-react';

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (updatedTask: Task) => void;
  onViewSourceDoc?: (docNo: string) => void;
}

export const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  task,
  isOpen,
  onClose,
  onUpdateTask,
  onViewSourceDoc
}) => {
  if (!isOpen || !task) return null;

  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [progress, setProgress] = useState<number>(task.progress);
  const [comment, setComment] = useState('');
  const [blocker, setBlocker] = useState(task.blocker || '');
  const [nextAction, setNextAction] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<EvidenceFile[]>(task.evidence || []);

  const handleAddEvidence = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newEvidence: EvidenceFile = {
        id: 'ev-' + Date.now(),
        fileName: file.name,
        fileSize: (file.size / 1024 > 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${(file.size / 1024).toFixed(0)} KB`),
        fileType: 'PDF',
        uploadedAt: '7 ต.ค. 2569 ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        uploadedBy: task.primaryAssignee,
        url: '#'
      };
      setAttachedFiles([...attachedFiles, newEvidence]);
    }
  };

  const handleSaveProgress = () => {
    const isCompleted = progress === 100 || status === 'COMPLETED';
    const newStatus = isCompleted ? 'COMPLETED' : status;

    const newUpdate: TaskUpdate = {
      id: 'up-' + Date.now(),
      taskId: task.id,
      timestamp: '7 ต.ค. 2569 ' + new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      userName: task.primaryAssignee,
      userRole: 'ผู้รับผิดชอบงาน',
      progressPercent: progress,
      status: newStatus,
      comment: comment || `อัปเดตความคืบหน้าเป็น ${progress}%`,
      blocker: blocker || undefined,
      nextAction: nextAction || undefined
    };

    const updatedTask: Task = {
      ...task,
      status: newStatus,
      progress,
      blocker: blocker || undefined,
      evidence: attachedFiles,
      updates: [newUpdate, ...(task.updates || [])],
      updatedDate: '2026-10-07',
      completedDate: isCompleted ? '2026-10-07' : task.completedDate
    };

    onUpdateTask(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-navy-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInRight">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-navy-900 to-[#122e54] text-white p-4 flex items-center justify-between border-b border-navy-700">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg">
              {task.code}
            </span>
            <div className="text-xs text-slate-300">
              สายงาน: <span className="font-bold text-white capitalize">{task.workstreamId}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Task Title & Details */}
          <div>
            <h2 className="text-base font-extrabold text-slate-800 leading-tight">
              {task.title}
            </h2>
            <p className="text-slate-600 mt-1 text-xs leading-relaxed">
              {task.description}
            </p>
          </div>

          {/* Traceability Panel */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between text-blue-900 font-bold">
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>การย้อนรอยกลับเอกสารต้นทาง (Traceability)</span>
              </span>
              {onViewSourceDoc && (
                <button
                  onClick={() => onViewSourceDoc(task.sourceDocumentNo)}
                  className="text-[11px] text-blue-700 hover:text-blue-900 underline flex items-center gap-1"
                >
                  <span>ดูหนังสือต้นฉบับ</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-blue-100">
              <div>
                <span className="text-slate-400 block">เลขที่หนังสือ:</span>
                <span className="font-semibold text-slate-800">{task.sourceDocumentNo}</span>
              </div>
              <div>
                <span className="text-slate-400 block">รหัสข้อสั่งการ (Order ID):</span>
                <span className="font-mono font-semibold text-slate-800">{task.sourceOrderId}</span>
              </div>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">ผู้รับผิดชอบหลัก</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {task.primaryAssignee}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">กลุ่มงาน</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <Building2 className="w-3.5 h-3.5 text-slate-500" />
                {task.department}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">กำหนดส่ง (Deadline)</span>
              <span className="font-bold text-rose-600 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-rose-500" />
                {task.deadline}
              </span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px]">ระดับความเสี่ยง</span>
              <span className="font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                {task.risk}
              </span>
            </div>
          </div>

          {/* Form: Update Progress & Status */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3.5">
            <h3 className="font-bold text-slate-800 flex items-center gap-1.5">
              <span>รายงานผลความคืบหน้า (Progress Update)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">สถานะงาน:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl font-medium focus:ring-1 focus:ring-blue-500 text-xs"
                >
                  <option value="IN_PROGRESS">กำลังดำเนินการ</option>
                  <option value="ASSIGNED">รับเรื่องแล้ว</option>
                  <option value="WAITING_INFORMATION">รอข้อมูล / ประสานงาน</option>
                  <option value="BLOCKED">ติดปัญหา (Blocked)</option>
                  <option value="OVERDUE">เกินกำหนด (Overdue)</option>
                  <option value="COMPLETED">ปิดงานแล้ว (Completed)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ความคืบหน้า: <span className="font-bold text-blue-600">{progress}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full mt-2 cursor-pointer accent-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">บันทึกผลการดำเนินงาน:</label>
              <textarea
                rows={2}
                placeholder="ระบุความคืบหน้า รายละเอียดผลการดำเนินงานล่าสุด..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-rose-700 block mb-1">ปัญหา / อุปสรรค (ถ้ามี):</label>
                <input
                  type="text"
                  placeholder="เช่น รอเอกสาร รพช., ติดขัดระบบงบประมาณ"
                  value={blocker}
                  onChange={(e) => setBlocker(e.target.value)}
                  className="w-full p-2 bg-white border border-rose-200 rounded-xl focus:ring-1 focus:ring-rose-500 text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">ขั้นตอนถัดไป (Next Action):</label>
                <input
                  type="text"
                  placeholder="เช่น จัดส่งรายงานผู้บริหาร, ประสานงาน ผอ."
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 text-xs"
                />
              </div>
            </div>

            {/* Evidence Attachment */}
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5 flex items-center justify-between">
                <span>หลักฐานการดำเนินงาน (Evidence):</span>
                <span className="text-[10px] text-slate-400">PDF, XLSX, DOCX, รูปภาพ</span>
              </label>

              {/* Upload Input */}
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="file"
                  id="evidence-file-input"
                  className="hidden"
                  onChange={handleAddEvidence}
                />
                <label
                  htmlFor="evidence-file-input"
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer flex items-center gap-1 transition"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>แนบไฟล์หลักฐาน</span>
                </label>
              </div>

              {/* List of evidence */}
              <div className="space-y-1.5">
                {attachedFiles.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{ev.fileName}</span>
                      <span className="text-[10px] text-slate-400">({ev.fileSize})</span>
                    </div>
                    <span className="text-[10px] text-slate-500 shrink-0">{ev.uploadedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <h3 className="font-bold text-slate-800 mb-2.5 flex items-center gap-1.5">
              <History className="w-4 h-4 text-slate-500" />
              <span>ประวัติความคืบหน้า (Activity Timeline)</span>
            </h3>
            <div className="space-y-2 border-l-2 border-slate-200 ml-2 pl-3">
              {(task.updates || []).map((up) => (
                <div key={up.id} className="relative pb-1">
                  <div className="absolute -left-[19px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-800">{up.userName}</span>
                    <span className="text-[10px] text-slate-400">{up.timestamp}</span>
                  </div>
                  <div className="text-slate-600 mt-0.5">{up.comment}</div>
                  {up.blocker && (
                    <div className="text-rose-600 font-medium text-[11px] mt-0.5">
                      ⚠️ ติดปัญหา: {up.blocker}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-semibold transition"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSaveProgress}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
          >
            <CheckCircle className="w-4 h-4" />
            <span>บันทึกความคืบหน้า</span>
          </button>
        </div>
      </div>
    </div>
  );
};
