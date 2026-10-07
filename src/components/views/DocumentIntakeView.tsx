import React from 'react';
import { Document, Order } from '../../types';
import { FileUp, FileText, Bot, CheckCircle2, Clock, Sparkles, ExternalLink, Plus } from 'lucide-react';

interface DocumentIntakeViewProps {
  documents: Document[];
  orders: Order[];
  onOpenUpload: () => void;
  onSelectDocument: (doc: Document) => void;
}

export const DocumentIntakeView: React.FC<DocumentIntakeViewProps> = ({
  documents,
  orders,
  onOpenUpload,
  onSelectDocument
}) => {
  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>รับหนังสือราชการ (Document Intake &amp; AI Extraction)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            สแกน OCR หนังสือราชการ สกัดข้อสั่งการ นพ.สสจ. และจำแนกงานอัตโนมัติ (AI Suggest → Human Confirm)
          </p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition shadow-md self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Upload หนังสือราชการ</span>
        </button>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
              <tr>
                <th className="py-2.5 px-3">เลขที่หนังสือ</th>
                <th className="py-2.5 px-3">เรื่อง</th>
                <th className="py-2.5 px-3">หน่วยงานผู้ส่ง</th>
                <th className="py-2.5 px-3">ข้อสั่งการ นพ.สสจ.</th>
                <th className="py-2.5 px-3">ความเร่งด่วน</th>
                <th className="py-2.5 px-3">AI Confidence</th>
                <th className="py-2.5 px-3">สถานะ</th>
                <th className="py-2.5 px-3 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => {
                const docOrders = orders.filter(o => o.documentId === doc.id);
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3 font-semibold text-blue-700 whitespace-nowrap">
                      {doc.docNo}
                      <span className="block text-[10px] text-slate-400 font-normal">{doc.date}</span>
                    </td>
                    <td className="py-3 px-3 max-w-xs font-medium text-slate-800">
                      {doc.title}
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-[140px] truncate">
                      {doc.sender}
                    </td>
                    <td className="py-3 px-3 text-slate-700 max-w-sm italic">
                      "{doc.commandNote}"
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.urgency === 'ด่วนที่สุด' ? 'bg-rose-100 text-rose-700' :
                        doc.urgency === 'ด่วนมาก' ? 'bg-orange-100 text-orange-700' :
                        doc.urgency === 'ด่วน' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {doc.urgency}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      {doc.aiAnalysis ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <Bot className="w-3 h-3" />
                          {doc.aiAnalysis.confidence}%
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        แตกแล้ว {docOrders.length || 3} Tasks
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onSelectDocument(doc)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-600 text-xs font-semibold inline-flex items-center gap-1 transition"
                      >
                        <span>รายละเอียด</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
