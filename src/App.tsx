import React, { useState, useEffect } from 'react';
import { 
  Task, Order, Document, CalendarEvent, SystemNotification, UserRole, WorkstreamType, TaskStatus 
} from './types';
import { AppStorage } from './services/storage';
import { Header } from './components/layout/Header';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { DocumentIntakeView } from './components/views/DocumentIntakeView';
import { OrdersView } from './components/views/OrdersView';
import { WorkstreamDetailView } from './components/views/WorkstreamDetailView';
import { WorkTrackingView } from './components/views/WorkTrackingView';
import { CalendarView } from './components/views/CalendarView';
import { PersonnelView } from './components/views/PersonnelView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

import { UploadDocumentModal } from './components/modals/UploadDocumentModal';
import { TaskDetailModal } from './components/modals/TaskDetailModal';
import { AiExecutiveBriefModal } from './components/modals/AiExecutiveBriefModal';
import { LineChatModal } from './components/modals/LineChatModal';
import { NotificationDrawer } from './components/modals/NotificationDrawer';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<NavItemKey>('dashboard');
  const [currentRole, setCurrentRole] = useState<UserRole>(AppStorage.getCurrentRole());

  const [documents, setDocuments] = useState<Document[]>(AppStorage.getDocuments());
  const [orders, setOrders] = useState<Order[]>(AppStorage.getOrders());
  const [tasks, setTasks] = useState<Task[]>(AppStorage.getTasks());
  const [events, setEvents] = useState<CalendarEvent[]>(AppStorage.getEvents());
  const [notifications, setNotifications] = useState<SystemNotification[]>(AppStorage.getNotifications());

  // Modal States
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLineModalOpen, setIsLineModalOpen] = useState(false);
  const [isAiBriefOpen, setIsAiBriefOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter Presets for clicking widgets
  const [filterRiskPreset, setFilterRiskPreset] = useState<string | undefined>(undefined);

  // Save changes to storage
  const handleUpdateTask = (updated: Task) => {
    const newTasks = tasks.map(t => t.id === updated.id ? updated : t);
    setTasks(newTasks);
    AppStorage.saveTasks(newTasks);
    setSelectedTask(updated);
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const target = tasks.find(t => t.id === taskId);
    if (!target) return;
    const updated: Task = {
      ...target,
      status: newStatus,
      progress: newStatus === 'COMPLETED' ? 100 : target.progress,
      completedDate: newStatus === 'COMPLETED' ? '2026-10-07' : target.completedDate
    };
    handleUpdateTask(updated);
  };

  const handleNewDocumentCompleted = (newDoc: Document, newOrders: Order[], newTasks: Task[]) => {
    const updatedDocs = [newDoc, ...documents];
    const updatedOrders = [...newOrders, ...orders];
    const updatedTasks = [...newTasks, ...tasks];

    setDocuments(updatedDocs);
    setOrders(updatedOrders);
    setTasks(updatedTasks);

    AppStorage.saveDocuments(updatedDocs);
    AppStorage.saveOrders(updatedOrders);
    AppStorage.saveTasks(updatedTasks);

    // Add notification
    const newNotif: SystemNotification = {
      id: 'notif-' + Date.now(),
      title: 'สร้างงานใหม่สำเร็จ',
      message: `หนังสือ ${newDoc.docNo} สร้างงานแล้ว ${newTasks.length} รายการ`,
      type: 'ASSIGNMENT',
      timestamp: 'เมื่อสักครู่',
      isRead: false
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    AppStorage.saveNotifications(updatedNotifs);
  };

  const handleResetSeedData = () => {
    AppStorage.resetToSeed();
    setDocuments(AppStorage.getDocuments());
    setOrders(AppStorage.getOrders());
    setTasks(AppStorage.getTasks());
    setEvents(AppStorage.getEvents());
    setNotifications(AppStorage.getNotifications());
    setCurrentRole('EXECUTIVE');
    setCurrentView('dashboard');
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    AppStorage.setCurrentRole(role);
  };

  const handleSelectWorkstream = (wsId: WorkstreamType) => {
    switch (wsId) {
      case 'plan': setCurrentView('ws_plan'); break;
      case 'budget': setCurrentView('ws_budget'); break;
      case 'supervision': setCurrentView('ws_supervision'); break;
      case 'data': setCurrentView('ws_data'); break;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const stats = AppStorage.getDashboardStats();

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-thai selection:bg-teal-500 selection:text-white">
      {/* 1. Executive Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadCount}
      />

      {/* 2. Main Layout (Sidebar + Content View) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => {
            setCurrentView(view);
            if (view === 'upload_doc') {
              // Open intake view and also offer upload
            }
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5">
          {currentView === 'dashboard' && (
            <DashboardView
              stats={stats}
              tasks={tasks}
              events={events}
              onSelectTask={(task) => setSelectedTask(task)}
              onSelectWorkstream={handleSelectWorkstream}
              onViewAllCalendar={() => setCurrentView('calendar')}
              onSelectEvent={(ev) => {}}
              onOpenLineModal={() => setIsLineModalOpen(true)}
              onOpenAiBrief={() => setIsAiBriefOpen(true)}
              onOpenUpload={() => setIsUploadOpen(true)}
              onFilterRisk={(risk) => {
                setFilterRiskPreset(risk);
                setCurrentView('work_tracking');
              }}
            />
          )}

          {currentView === 'upload_doc' && (
            <DocumentIntakeView
              documents={documents}
              orders={orders}
              onOpenUpload={() => setIsUploadOpen(true)}
              onSelectDocument={(doc) => {}}
            />
          )}

          {currentView === 'orders' && (
            <OrdersView orders={orders} />
          )}

          {currentView === 'ws_plan' && (
            <WorkstreamDetailView
              wsId="plan"
              tasks={tasks}
              onSelectTask={(t) => setSelectedTask(t)}
            />
          )}

          {currentView === 'ws_budget' && (
            <WorkstreamDetailView
              wsId="budget"
              tasks={tasks}
              onSelectTask={(t) => setSelectedTask(t)}
            />
          )}

          {currentView === 'ws_supervision' && (
            <WorkstreamDetailView
              wsId="supervision"
              tasks={tasks}
              onSelectTask={(t) => setSelectedTask(t)}
            />
          )}

          {currentView === 'ws_data' && (
            <WorkstreamDetailView
              wsId="data"
              tasks={tasks}
              onSelectTask={(t) => setSelectedTask(t)}
            />
          )}

          {currentView === 'work_tracking' && (
            <WorkTrackingView
              tasks={tasks}
              onSelectTask={(t) => setSelectedTask(t)}
              onUpdateTaskStatus={handleUpdateTaskStatus}
            />
          )}

          {currentView === 'calendar' && (
            <CalendarView events={events} />
          )}

          {currentView === 'personnel' && (
            <PersonnelView tasks={tasks} />
          )}

          {currentView === 'reports' && (
            <ReportsView tasks={tasks} />
          )}

          {currentView === 'settings' && (
            <SettingsView onResetSeedData={handleResetSeedData} />
          )}
        </main>
      </div>

      {/* 3. Global Interactive Modals & Drawers */}
      <UploadDocumentModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onComplete={handleNewDocumentCompleted}
      />

      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onViewSourceDoc={(docNo) => {
          setSelectedTask(null);
          setCurrentView('upload_doc');
        }}
      />

      <AiExecutiveBriefModal
        isOpen={isAiBriefOpen}
        onClose={() => setIsAiBriefOpen(false)}
        tasks={tasks}
      />

      <LineChatModal
        isOpen={isLineModalOpen}
        onClose={() => setIsLineModalOpen(false)}
        tasks={tasks}
        events={events}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => {
          const marked = notifications.map(n => ({ ...n, isRead: true }));
          setNotifications(marked);
          AppStorage.saveNotifications(marked);
        }}
      />
    </div>
  );
};

export default App;
