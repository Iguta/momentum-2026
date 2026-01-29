import { useEffect, useState, type FormEvent } from 'react'
import type { Task } from '../types/task'
import type { Category } from '../types/category'
import './TaskForm.css'

interface TaskFormProps {
  categories: Category[]
  onSubmit: (task: Task) => void
  onCancel: () => void
  editingTask?: Task | null
}

const emptyTask = (categoryId: string): Task => ({
  id: '',
  title: '',
  description: '',
  dueDate: new Date().toISOString(),
  priority: 'Medium',
  weight: 3,
  categoryId,
  completed: false,
  createdAt: new Date().toISOString(),
})

const toIsoDate = (value: string) => (value ? new Date(value).toISOString() : '')

const TaskForm = ({ categories, onSubmit, onCancel, editingTask }: TaskFormProps) => {
  const [task, setTask] = useState<Task>(() => emptyTask(categories[0]?.id ?? ''))

  useEffect(() => {
    if (editingTask) {
      setTask(editingTask)
    } else {
      setTask(emptyTask(categories[0]?.id ?? ''))
    }
  }, [editingTask, categories])

  const handleChange = (field: keyof Task, value: string | number | boolean) => {
    setTask((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextTask: Task = {
      ...task,
      id: task.id || `task-${Date.now()}`,
      createdAt: task.createdAt || new Date().toISOString(),
    }
    onSubmit(nextTask)
    if (!editingTask) {
      setTask(emptyTask(categories[0]?.id ?? ''))
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__grid">
        <label>
          Title
          <input
            value={task.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Define the task focus"
            required
          />
        </label>
        <label>
          Due date
          <input
            type="date"
            value={task.dueDate.slice(0, 10)}
            onChange={(event) => handleChange('dueDate', toIsoDate(event.target.value))}
            required
          />
        </label>
        <label className="task-form__full">
          Description
          <textarea
            value={task.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Add more detail"
            rows={3}
            required
          />
        </label>
        <label>
          Priority
          <select
            value={task.priority}
            onChange={(event) => handleChange('priority', event.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Weight
          <input
            type="number"
            min={1}
            max={5}
            value={task.weight}
            onChange={(event) => handleChange('weight', Number(event.target.value))}
          />
        </label>
        <label>
          Category
          <select
            value={task.categoryId}
            onChange={(event) => handleChange('categoryId', event.target.value)}
            disabled={categories.length === 0}
          >
            {categories.length === 0 && <option value="">No categories yet</option>}
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="task-form__actions">
        <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
        {editingTask && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
