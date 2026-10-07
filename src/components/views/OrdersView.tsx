import React, { useState } from 'react';
import { Order, WorkstreamType } from '../../types';
import { Target, Search, Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders }) => {
  const [search, setSearch] = useState('');
  const [filterWs, setFilterWs] = useState<string>('ALL');

  const filtered = orders.filter(o => {
    if (search && !o.orderText.toLowerCase().includes(search.toLowerCase()) && !o.documentNo.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterWs !== 'ALL' && o.workstreamId !== filterWs) return false;
    return true;
  });

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <span>รายการข้อสั่งการทั้งหมด (Executive Orders &amp; Commands)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            หลักการ: "1 หนังสือ → หลายข้อสั่งการ → หลาย Task → หลายผู้รับผิดชอบ"
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="ค้นหาข้อสั่งการ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
            />
          </div>
          <select
            value={filterWs}
            onChange={(e) => setFilterWs(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700"
          >
            <option value="ALL">ทุกขางาน</option>
            <option value="plan">แผนงาน/โครงการ</option>
            <option value="budget">งบประมาณ</option>
            <option value="supervision">นิเทศติดตาม</option>
            <option value="data">ข้อมูล</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filtered.map((ord) => (
          <div key={ord.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-2.5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                {ord.code}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                ord.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-700' :
                ord.priority === 'HIGH' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {ord.priority}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-800 leading-snug">
              {ord.orderText}
            </h3>

            <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
              <div>อ้างอิงหนังสือ: <span className="font-semibold text-slate-700">{ord.documentNo}</span></div>
              <div>ขางาน: <span className="font-semibold capitalize text-slate-700">{ord.workstreamId}</span> | หน่วยงาน: <span className="font-semibold text-slate-700">{ord.suggestedDepartment}</span></div>
              <div>ผู้รับผิดชอบที่มอบหมาย: <span className="font-semibold text-slate-700">{ord.suggestedAssignee}</span></div>
              <div>กำหนดส่ง: <span className="font-semibold text-rose-600">{ord.deadline}</span></div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500">ความคืบหน้ารวม:</span>
              <span className="font-bold text-blue-600">{ord.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
