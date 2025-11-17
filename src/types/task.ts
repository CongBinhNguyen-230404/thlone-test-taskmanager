export type Priority = 'high' | 'medium' | 'low';
export type TaskStatus = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  category?: string;
  createdAt: string;
  completedAt?: string;
}

export interface TaskFilters {
  status: TaskStatus;
  priority?: Priority;
  category?: string;
  searchQuery: string;
}
