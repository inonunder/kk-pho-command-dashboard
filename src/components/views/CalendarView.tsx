import React, { useState } from 'react';
import { CalendarEvent } from '../../types';
import { Calendar as CalendarIcon, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent?: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onAddEvent }) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filtered = events.filter(e => {
    if (filterType !== 'ALL' && e.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>ปฏิทินกลาง (Central Executive Calendar)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ประชุม นิเทศงาน ลงพื้นที่ และกำหนดส่งรายงานที่เชื่อมโยงกับหนังสือราชการและข้อสั่งการ
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700"
          >
            <option value="ALL">ทุกประเภทกิจกรรม</option>
            <option value="MEETING">การประชุม</option>
            <option value="SUPERVISION">การนิเทศติดตาม</option>
            <option value="DEADLINE">กำหนดส่งรายงาน</option>
            <option value="FIELDWORK">ลงพื้นที่</option>
          </select>
        </div>
      </div>

      {/* Events Timeline / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((ev) => (
          <div key={ev.id} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-2.5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                {ev.date}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {ev.type}
              </span>
            </div>

            <h3 className="text-sm font-bold text-slate-800 leading-snug">
              {ev.title}
            </h3>

            <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2 text-blue-700 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{ev.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ev.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>หน่วยจัด: {ev.department}</span>
              </div>
            </div>

            {ev.participants && ev.participants.length > 0 && (
              <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                <span className="font-semibold text-slate-700">ผู้เข้าร่วม:</span> {ev.participants.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
