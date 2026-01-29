export type Priority = 'Low' | 'Medium' | 'High'

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: Priority
  weight: number
  categoryId: string
  completed: boolean
  createdAt: string
}
