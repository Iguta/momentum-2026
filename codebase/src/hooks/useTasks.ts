import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { addTask, deleteTask, getTasks, saveTasks, updateTask } from '../services/taskService'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  const createTask = (task: Task) => setTasks(addTask(task))

  const editTask = (task: Task) => setTasks(updateTask(task))

  const removeTask = (taskId: string) => setTasks(deleteTask(taskId))

  const toggleTask = (taskId: string) => {
    const next = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )
    setTasks(next)
    saveTasks(next)
  }

  return {
    tasks,
    setTasks,
    createTask,
    editTask,
    removeTask,
    toggleTask,
  }
}
