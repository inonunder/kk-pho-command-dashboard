import React, { useState } from 'react';
import { AiService, AiAnalysisResult } from '../../services/aiService';
import { WorkstreamType, Document, Order, Task } from '../../types';
import { 
  FileUp, 
  Bot, 
  Check, 
  AlertCircle, 
  Sparkles, 
  X, 
  FileText, 
  Calendar, 
  User, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (newDoc: Document, newOrders: Order[], newTasks: Task[]) => void;
}

export const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState<number>(1); // 1: Upload, 2: AI Processing, 3: Review & Confirm, 4: Success
  const [selectedFile, setSelectedFile] = useState<File | { name: string; size: number } | null>(null);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states for editable Human Confirmation
  const [docNo, setDocNo] = useState('');
  const [title, setTitle] = useState('');
  const [sender, setSender] = useState('');
  const [commandNote, setCommandNote] = useState('');
  const [urgency, setUrgency] = useState<'ด่วนที่สุด' | 'ด่วนมาก' | 'ด่วน' | 'ปกติ'>('ด่วนมาก');
  const [extractedOrders, setExtractedOrders] = useState<AiAnalysisResult['extractedOrders']>([]);

  if (!isOpen) return null;

  const handleSelectSample = (sampleType: 'plan' | 'budget' | 'supervision') => {
    let name = 'MOPH_Strategic_Plan_2570.pdf';
    if (sampleType === 'budget') name = 'Budget_Allocation_Q1_2570.pdf';
    if (sampleType === 'supervision') name = 'Supervision_Order_KhonKaen_2570.pdf';

    setSelectedFile({ name, size: 2450000 });
    startAiAnalysis({ name, size: 2450000 });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      startAiAnalysis(file);
    }
  };

  const startAiAnalysis = async (file: File | { name: string; size: number }) => {
    setStep(2);
    setLoading(true);
    try {
      const result = await AiService.analyzeDocument(file);
      setAiResult(result);
      setDocNo(result.docNo);
      setTitle(result.title);
      setSender(result.sender);
      setCommandNote(result.commandNote);
      setUrgency(result.urgency);
      setExtractedOrders(result.extractedOrders);
      setStep(3); // Ready for Human Confirm
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAndCreateTasks = () => {
    if (!aiResult) return;

    const newDocId = 'doc-' + Date.now();
    const newDoc: Document = {
      id: newDocId,
      docNo,
      date: '2026-10-07',
      receivedDate: '2026-10-07',
      title,
      sender,
      receiver: 'นพ.สสจ.ขอนแก่น',
      commandNote,
      commandDate: '2026-10-07',
      commander: 'นพ.อภิชัย ลิมานนท์ (นพ.สสจ.ขอนแก่น)',
      urgency,
      secretLevel: 'ปกติ',
      fileName: selectedFile?.name || 'document.pdf',
      fileSize: '2.4 MB',
      pageCount: 6,
      status: 'TASKS_CREATED',
      aiAnalysis: {
        confidence: aiResult.confidence,
        extractedOrders: extractedOrders.map(o => o.orderText),
        suggestedWorkstream: extractedOrders[0]?.workstreamId || 'plan',
        suggestedAssignee: extractedOrders[0]?.suggestedAssignee || 'นายสมชาย บุญชู',
        suggestedDeadline: extractedOrders[0]?.deadline || '2026-10-20',
        summary: aiResult.executiveSummary
      }
    };

    const createdOrders: Order[] = [];
    const createdTasks: Task[] = [];

    extractedOrders.forEach((item, index) => {
      const ordId = `ord-${Date.now()}-${index}`;
      const taskId = `tsk-${Date.now()}-${index}`;

      createdOrders.push({
        id: ordId,
        code: `ORD-2569-${Math.floor(100 + Math.random() * 900)}`,
        documentId: newDocId,
        documentNo: docNo,
        orderText: item.orderText,
        priority: item.priority,
        workstreamId: item.workstreamId,
        suggestedAssignee: item.suggestedAssignee,
        suggestedDepartment: item.suggestedDepartment,
        deadline: item.deadline,
        status: 'ASSIGNED',
        progress: 0,
        taskIds: [taskId],
        aiConfidence: item.confidence,
        humanConfirmed: true
      });

      createdTasks.push({
        id: taskId,
        code: `TSK-2569-${Math.floor(100 + Math.random() * 900)}`,
        title: item.orderText,
        description: `ข้อสั่งการจากหนังสือราชการ ${docNo}: ${title}`,
        sourceOrderId: ordId,
        sourceDocumentId: newDocId,
        sourceDocumentNo: docNo,
        workstreamId: item.workstreamId,
        subWork: item.workstreamId === 'plan' ? 'แผนงาน' : item.workstreamId === 'budget' ? 'งบประมาณ' : 'นิเทศติดตาม',
        department: item.suggestedDepartment,
        primaryAssignee: item.suggestedAssignee.split(' ')[0] + ' ' + (item.suggestedAssignee.split(' ')[1] || ''),
        primaryAssigneeId: 'u-2',
        collaborators: [],
        priority: item.priority,
        status: 'ASSIGNED',
        progress: 10,
        startDate: '2026-10-07',
        deadline: item.deadline,
        risk: 'NORMAL',
        remark: 'สร้างโดย AI Assistant และได้รับการยืนยันจากผู้บริหาร/เจ้าหน้าที่แล้ว',
        evidence: [],
        updates: [
          {
            id: 'up-' + Date.now(),
            taskId,
            timestamp: '7 ต.ค. 2569 08:45 น.',
            userName: 'ผู้ดูแลระบบกลาง',
            userRole: 'เจ้าหน้าที่รับเรื่อง',
            progressPercent: 10,
            status: 'ASSIGNED',
            comment: 'รับเรื่องจากหนังสือราชการและมอบหมายงานเรียบร้อย'
          }
        ],
        createdDate: '2026-10-07',
        updatedDate: '2026-10-07'
      });
    });

    onComplete(newDoc, createdOrders, createdTasks);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-[#122e54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30">
              <FileUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">รับหนังสือราชการ &amp; สกัดข้อสั่งการด้วย AI</h3>
              <p className="text-xs text-slate-300">
                หลักการทำงาน: <span className="text-amber-300 font-semibold">"AI Suggest → Human Confirm"</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {/* STEP 1: Upload File */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/60 hover:bg-blue-50/20 transition group">
                <FileUp className="w-12 h-12 text-slate-400 group-hover:text-blue-500 mx-auto mb-2 transition" />
                <h4 className="text-sm font-bold text-slate-700">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่ออัปโหลด</h4>
                <p className="text-xs text-slate-400 mt-1">
                  รองรับเอกสารราชการ: PDF, DOCX, JPG, PNG (ขนาดไม่เกิน 25 MB)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.jpg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doc-upload-input"
                />
                <label
                  htmlFor="doc-upload-input"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition"
                >
                  <FileUp className="w-4 h-4" />
                  <span>เลือกไฟล์จากเครื่อง</span>
                </label>
              </div>

              {/* Quick Sample Selector for Demo */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5">
                <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>ทดสอบระบบทันทีด้วยตัวอย่างหนังสือราชการ (Demo Presets):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSelectSample('plan')}
                    className="p-2 text-left rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs transition"
                  >
                    <div className="font-bold text-blue-700">1. สายแผนงาน/โครงการ</div>
                    <div className="text-[10px] text-slate-500 truncate">แผนยุทธศาสตร์ 2570</div>
                  </button>
                  <button
                    onClick={() => handleSelectSample('budget')}
                    className="p-2 text-left rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-xs transition"
                  >
                    <div className="font-bold text-emerald-700">2. สายงบประมาณ</div>
                    <div className="text-[10px] text-slate-500 truncate">เร่งรัดการเบิกจ่ายไตรมาส 1</div>
                  </button>
                  <button
                    onClick={() => handleSelectSample('supervision')}
                    className="p-2 text-left rounded-xl bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 text-xs transition"
                  >
                    <div className="font-bold text-amber-700">3. สายนิเทศติดตาม</div>
                    <div className="text-[10px] text-slate-500 truncate">ตรวจราชการผสมผสาน CUP</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: AI Processing & OCR Simulation */}
          {step === 2 && (
            <div className="py-12 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping opacity-30"></div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                  <Bot className="w-8 h-8 animate-bounce" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-800">
                  กำลังอ่านและวิเคราะห์เอกสารราชการด้วย AI OCR...
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  ระบบกำลังสกัดเลขที่หนังสือ เรื่อง วันที่ ข้อสั่งการ นพ.สสจ. จำแนก 4 ขางาน และแนะนำผู้รับผิดชอบที่เหมาะสม
                </p>
              </div>
              <div className="w-64 h-2 bg-slate-100 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Human Confirmation */}
          {step === 3 && aiResult && (
            <div className="space-y-4">
              {/* AI Confidence Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>AI สกัดข้อสั่งการสำเร็จ (ความเชื่อมั่น: {aiResult.confidence}%)</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-medium">
                  เจ้าหน้าที่ตรวจสอบและแก้ไขได้ทุกช่อง
                </span>
              </div>

              {/* Document Metadata Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">เลขที่หนังสือ:</label>
                  <input
                    type="text"
                    value={docNo}
                    onChange={(e) => setDocNo(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ความเร่งด่วน:</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="ด่วนที่สุด">ด่วนที่สุด (สีแดง)</option>
                    <option value="ด่วนมาก">ด่วนมาก (สีส้ม)</option>
                    <option value="ด่วน">ด่วน (สีเหลือง)</option>
                    <option value="ปกติ">ปกติ</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">เรื่อง:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">ข้อสั่งการ นพ.สสจ. (เกษียณหนังสือ):</label>
                  <textarea
                    rows={2}
                    value={commandNote}
                    onChange={(e) => setCommandNote(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* Extracted Orders & Suggested Tasks */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>ข้อสั่งการที่แตกเป็นงานย่อย ({extractedOrders.length} Tasks)</span>
                  </h4>
                  <span className="text-[10px] text-slate-500">1 หนังสือ → หลายข้อสั่งการ → หลาย Task</span>
                </div>

                <div className="space-y-2.5">
                  {extractedOrders.map((ord, idx) => (
                    <div key={idx} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                          Task #{idx + 1}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          ความแม่นยำ AI {ord.confidence}%
                        </span>
                      </div>

                      <input
                        type="text"
                        value={ord.orderText}
                        onChange={(e) => {
                          const updated = [...extractedOrders];
                          updated[idx].orderText = e.target.value;
                          setExtractedOrders(updated);
                        }}
                        className="w-full p-1.5 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                        <div>
                          <label className="text-slate-500 block mb-0.5">ขางาน:</label>
                          <select
                            value={ord.workstreamId}
                            onChange={(e) => {
                              const updated = [...extractedOrders];
                              updated[idx].workstreamId = e.target.value as WorkstreamType;
                              setExtractedOrders(updated);
                            }}
                            className="w-full p-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium"
                          >
                            <option value="plan">แผนงาน/โครงการ</option>
                            <option value="budget">งบประมาณ</option>
                            <option value="supervision">นิเทศติดตาม</option>
                            <option value="data">ข้อมูล</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-slate-500 block mb-0.5">ผู้รับผิดชอบ:</label>
                          <input
                            type="text"
                            value={ord.suggestedAssignee}
                            onChange={(e) => {
                              const updated = [...extractedOrders];
                              updated[idx].suggestedAssignee = e.target.value;
                              setExtractedOrders(updated);
                            }}
                            className="w-full p-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-slate-500 block mb-0.5">กำหนดส่ง (Deadline):</label>
                          <input
                            type="date"
                            value={ord.deadline}
                            onChange={(e) => {
                              const updated = [...extractedOrders];
                              updated[idx].deadline = e.target.value;
                              setExtractedOrders(updated);
                            }}
                            className="w-full p-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Success Message */}
          {step === 4 && (
            <div className="py-10 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-slate-800">
                สร้างงานและบันทึกข้อสั่งการสำเร็จ!
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                รายการถูกเพิ่มลงในระบบ Work Tracking, ปฏิทินกลาง และระบบแจ้งเตือนเรียบร้อยแล้ว
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-semibold transition"
          >
            {step === 4 ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
          </button>

          {step === 3 && (
            <button
              onClick={handleConfirmAndCreateTasks}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>ยืนยันและสร้าง Tasks ({extractedOrders.length} งาน)</span>
            </button>
          )}

          {step === 4 && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md"
            >
              ดูใน Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
