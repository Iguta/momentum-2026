import type { Task } from '../types/task'
import { loadFromStorage, saveToStorage } from './storage'

const TASKS_KEY = 'momentum.tasks'

const seedTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Plan January focus goals',
    description: 'Outline three outcomes for the new year sprint.',
    dueDate: new Date().toISOString(),
    priority: 'High',
    weight: 5,
    categoryId: 'task-cat-1',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Evening wellness routine',
    description: 'Meditation + stretch + journal.',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    priority: 'Medium',
    weight: 3,
    categoryId: 'task-cat-2',
    completed: true,
    createdAt: new Date().toISOString(),
  },
]

export const getTasks = () => loadFromStorage<Task[]>(TASKS_KEY, seedTasks)

export const saveTasks = (tasks: Task[]) => saveToStorage(TASKS_KEY, tasks)

export const addTask = (task: Task) => {
  const tasks = getTasks()
  const next = [task, ...tasks]
  saveTasks(next)
  return next
}

export const updateTask = (task: Task) => {
  const tasks = getTasks().map((item) => (item.id === task.id ? task : item))
  saveTasks(tasks)
  return tasks
}

export const deleteTask = (taskId: string) => {
  const tasks = getTasks().filter((item) => item.id !== taskId)
  saveTasks(tasks)
  return tasks
}
