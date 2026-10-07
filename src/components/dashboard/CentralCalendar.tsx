import React, { useState } from 'react';
import { CalendarEvent } from '../../types';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CentralCalendarProps {
  events: CalendarEvent[];
  onViewAllCalendar: () => void;
  onSelectEvent?: (event: CalendarEvent) => void;
}

export const CentralCalendar: React.FC<CentralCalendarProps> = ({ 
  events, 
  onViewAllCalendar,
  onSelectEvent 
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(7); // Default 7 Oct 2569

  // October 2026 calendar days setup (1 Oct 2026 is Thursday)
  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday = 4 (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4)

  const todayEvents = events.filter(e => e.date === '2026-10-07');
  const highlightedDays = [7, 10, 13, 14, 15, 23];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">ปฏิทินกลาง</h3>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-600 font-semibold">
            <button className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] text-slate-700">วันนี้</button>
            <button className="p-0.5 rounded hover:bg-slate-100"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <span className="text-[11px] px-1 font-bold text-slate-800">ตุลาคม 2569</span>
            <button className="p-0.5 rounded hover:bg-slate-100"><ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>

        {/* Mini Calendar Grid */}
        <div className="text-[10px] text-center mb-3">
          <div className="grid grid-cols-7 gap-1 font-semibold text-slate-400 mb-1">
            <span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Empty slots before day 1 */}
            {Array.from({ length: startDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="h-6"></div>
            ))}
            {/* Days 1 to 31 */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 7;
              const isSelected = selectedDay === day;
              const hasEvents = highlightedDays.includes(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`h-6 rounded-lg flex items-center justify-center relative font-medium transition-colors ${
                    isToday
                      ? 'bg-navy-900 text-white font-bold shadow-sm'
                      : isSelected
                      ? 'bg-blue-100 text-blue-800 font-bold'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents && !isToday && (
                    <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-amber-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Activities List for Selected Day (Default: Today 7 Oct) */}
        <div>
          <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center justify-between">
            <span>กิจกรรมวันนี้ ({todayEvents.length})</span>
            <span className="text-[10px] text-slate-400 font-normal">7 ต.ค. 2569</span>
          </div>
          <div className="space-y-1.5">
            {todayEvents.map((ev) => (
              <div
                key={ev.id}
                onClick={() => onSelectEvent && onSelectEvent(ev)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 transition cursor-pointer"
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center text-[10px] font-bold text-blue-700 shrink-0">
                    <Clock className="w-3 h-3 mr-1 text-blue-500" />
                    <span>{ev.time.split(' ')[0]}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-800 flex-1 truncate ml-1.5">
                    {ev.title}
                  </div>
                </div>
                <div className="flex items-center text-[10px] text-slate-500 mt-0.5 ml-4 gap-2 truncate">
                  <span>{ev.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {ev.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="mt-3 pt-2 border-t border-slate-100 text-right">
        <button
          onClick={onViewAllCalendar}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
        >
          <span>ดูปฏิทินทั้งหมด</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
