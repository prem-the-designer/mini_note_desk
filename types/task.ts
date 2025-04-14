export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}