import { 
  Task, Order, Document, CalendarEvent, SystemNotification, SystemSettings, UserRole, User 
} from '../types';
import { 
  INITIAL_DOCUMENTS, INITIAL_ORDERS, INITIAL_TASKS, 
  INITIAL_CALENDAR_EVENTS, INITIAL_NOTIFICATIONS, INITIAL_SETTINGS, USERS 
} from '../data/seedData';

const STORAGE_KEYS = {
  DOCUMENTS: 'kk_pho_documents',
  ORDERS: 'kk_pho_orders',
  TASKS: 'kk_pho_tasks',
  EVENTS: 'kk_pho_events',
  NOTIFICATIONS: 'kk_pho_notifications',
  SETTINGS: 'kk_pho_settings',
  CURRENT_USER_ROLE: 'kk_pho_current_user_role'
};

export class AppStorage {
  static getSettings(): SystemSettings {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : INITIAL_SETTINGS;
  }

  static saveSettings(settings: SystemSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  static getCurrentRole(): UserRole {
    const role = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ROLE);
    return (role as UserRole) || 'EXECUTIVE';
  }

  static setCurrentRole(role: UserRole): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, role);
  }

  static getCurrentUser(): User {
    const role = this.getCurrentRole();
    const found = USERS.find(u => u.role === role);
    return found || USERS[0];
  }

  static getDocuments(): Document[] {
    const data = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return data ? JSON.parse(data) : INITIAL_DOCUMENTS;
  }

  static saveDocuments(docs: Document[]): void {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
  }

  static getOrders(): Order[] {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return data ? JSON.parse(data) : INITIAL_ORDERS;
  }

  static saveOrders(orders: Order[]): void {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  static getTasks(): Task[] {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  static getEvents(): CalendarEvent[] {
    const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return data ? JSON.parse(data) : INITIAL_CALENDAR_EVENTS;
  }

  static saveEvents(events: CalendarEvent[]): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
  }

  static getNotifications(): SystemNotification[] {
    const data = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
  }

  static saveNotifications(notifs: SystemNotification[]): void {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  }

  static resetToSeed(): void {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(INITIAL_DOCUMENTS));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(INITIAL_TASKS));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_CALENDAR_EVENTS));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ROLE, 'EXECUTIVE');
  }

  // Dashboard Aggregates matching the Mockup
  static getDashboardStats() {
    const tasks = this.getTasks();
    const documents = this.getDocuments();
    const orders = this.getOrders();

    // Baseline numbers for realistic provincial stats as displayed in mockup
    // We calibrate dynamic additions on top of baseline
    const baseTotalTasks = 128;
    const baseCompleted = 94;
    const baseInProgress = 27;
    const baseDueSoon = 12;
    const baseOverdue = 7;
    const baseDocs = 48;
    const baseOrders = 128;

    // Delta from newly created tasks in current session
    const dynamicNewTasks = tasks.length > INITIAL_TASKS.length ? tasks.length - INITIAL_TASKS.length : 0;
    const completedTasksCount = tasks.filter(t => t.status === 'COMPLETED').length;
    const dynamicCompleted = completedTasksCount > 1 ? (completedTasksCount - 1) : 0;

    const totalTasks = baseTotalTasks + dynamicNewTasks;
    const completed = baseCompleted + dynamicCompleted;
    const inProgress = Math.max(0, baseInProgress + (dynamicNewTasks - dynamicCompleted));
    const dueSoon = baseDueSoon;
    const overdue = baseOverdue;
    const completionRate = ((completed / totalTasks) * 100).toFixed(1);

    return {
      documentsCount: baseDocs + (documents.length - INITIAL_DOCUMENTS.length),
      ordersCount: baseOrders + (orders.length - INITIAL_ORDERS.length),
      totalTasks,
      completed,
      inProgress,
      dueSoon,
      overdue,
      completionRate: Number(completionRate),
      workstreams: {
        plan: { total: 32, completed: 24, inProgress: 6, dueSoon: 2, overdue: 1 },
        budget: { total: 28, completed: 18, inProgress: 7, dueSoon: 2, overdue: 1 },
        supervision: { total: 34, completed: 25, inProgress: 6, dueSoon: 2, overdue: 1 },
        data: { total: 34, completed: 26, inProgress: 8, dueSoon: 2, overdue: 1 }
      },
      riskCounts: {
        critical: 5,
        high: 12,
        medium: 18,
        normal: 93
      }
    };
  }
}
