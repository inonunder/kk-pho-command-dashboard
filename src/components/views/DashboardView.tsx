import React from 'react';
import { Task, CalendarEvent, WorkstreamType } from '../../types';
import { KpiSection } from '../dashboard/KpiSection';
import { WorkstreamCards } from '../dashboard/WorkstreamCards';
import { CentralCalendar } from '../dashboard/CentralCalendar';
import { RiskEngineWidget } from '../dashboard/RiskEngineWidget';
import { LineBriefWidget } from '../dashboard/LineBriefWidget';
import { WorkTrackingTable } from '../dashboard/WorkTrackingTable';
import { BottomFeatureBar } from '../dashboard/BottomFeatureBar';

interface DashboardViewProps {
  stats: any;
  tasks: Task[];
  events: CalendarEvent[];
  onSelectTask: (task: Task) => void;
  onSelectWorkstream: (wsId: WorkstreamType) => void;
  onViewAllCalendar: () => void;
  onSelectEvent: (event: CalendarEvent) => void;
  onOpenLineModal: () => void;
  onOpenAiBrief: () => void;
  onOpenUpload: () => void;
  onFilterRisk: (risk: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  tasks,
  events,
  onSelectTask,
  onSelectWorkstream,
  onViewAllCalendar,
  onSelectEvent,
  onOpenLineModal,
  onOpenAiBrief,
  onOpenUpload,
  onFilterRisk
}) => {
  return (
    <div className="space-y-4 max-w-[1700px] mx-auto">
      {/* 1. Top KPI Row (6 Cards + Circular Ring Progress) */}
      <KpiSection stats={stats} />

      {/* 2. Four Core Workstreams (4 ขางานหลัก) */}
      <WorkstreamCards 
        stats={stats.workstreams} 
        onSelectWorkstream={onSelectWorkstream} 
      />

      {/* 3. Middle Tri-Panel: Central Calendar | Risk Engine | LINE Daily Brief */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-4">
        {/* Central Calendar */}
        <div className="h-full">
          <CentralCalendar
            events={events}
            onViewAllCalendar={onViewAllCalendar}
            onSelectEvent={onSelectEvent}
          />
        </div>

        {/* Risk Engine */}
        <div className="h-full">
          <RiskEngineWidget
            stats={stats.riskCounts}
            totalTasks={stats.totalTasks}
            onFilterRisk={onFilterRisk}
            onViewAllAttention={onOpenAiBrief}
          />
        </div>

        {/* LINE Daily Brief */}
        <div className="h-full">
          <LineBriefWidget onOpenLineModal={onOpenLineModal} />
        </div>
      </div>

      {/* 4. Work Tracking Central Table */}
      <WorkTrackingTable
        tasks={tasks}
        onSelectTask={onSelectTask}
      />

      {/* 5. Bottom Feature Bar (Traceability flow & Feature Highlights) */}
      <BottomFeatureBar
        onOpenAiBrief={onOpenAiBrief}
        onOpenUpload={onOpenUpload}
      />
    </div>
  );
};
