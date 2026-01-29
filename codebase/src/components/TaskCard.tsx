import type { Task } from '../types/task'
import './TaskCard.css'

interface TaskCardProps {
  task: Task
  categoryName: string
  categoryColor: string
  onEdit: (task: Task) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const TaskCard = ({ task, categoryName, categoryColor, onEdit, onDelete, onToggle }: TaskCardProps) => (
  <article className={`task-card ${task.completed ? 'is-complete' : ''}`}>
    <div className="task-card__header">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <button className="task-card__toggle" onClick={() => onToggle(task.id)} type="button">
        {task.completed ? 'Completed' : 'Mark done'}
      </button>
    </div>
    <div className="task-card__meta">
      <span className="pill">Due {new Date(task.dueDate).toLocaleDateString()}</span>
      <span className="pill pill--priority">{task.priority} priority</span>
      <span className="pill">Weight {task.weight}</span>
      <span className="pill" style={{ borderColor: categoryColor, color: categoryColor }}>
        {categoryName}
      </span>
    </div>
    <div className="task-card__actions">
      <button type="button" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button type="button" className="ghost" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  </article>
)

export default TaskCard
