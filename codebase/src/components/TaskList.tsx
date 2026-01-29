import type { Task } from '../types/task'
import TaskCard from './TaskCard'
import './TaskList.css'

interface TaskListProps {
  tasks: Task[]
  view: 'list' | 'card'
  categoryLookup: Record<string, { name: string; color: string }>
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const TaskList = ({ tasks, view, categoryLookup, onEdit, onDelete, onToggle }: TaskListProps) => {
  if (tasks.length === 0) {
    return <div className="empty-state">No tasks match your filters yet.</div>
  }

  return (
    <div className={`task-list task-list--${view}`}>
      {tasks.map((task) => {
        const category = categoryLookup[task.categoryId] || {
          name: 'Unassigned',
          color: 'rgba(148, 163, 184, 0.6)',
        }
        return (
          <TaskCard
            key={task.id}
            task={task}
            categoryName={category.name}
            categoryColor={category.color}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        )
      })}
    </div>
  )
}

export default TaskList
