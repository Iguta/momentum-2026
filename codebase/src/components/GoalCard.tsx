import type { Goal } from '../types/goal'
import './GoalCard.css'

interface GoalCardProps {
  goal: Goal
  categoryName: string
  categoryColor: string
  onEdit: (goal: Goal) => void
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const GoalCard = ({ goal, categoryName, categoryColor, onEdit, onDelete, onToggle }: GoalCardProps) => (
  <article className={`goal-card ${goal.completed ? 'is-complete' : ''}`}>
    <div>
      <div className="goal-card__header">
        <h3>{goal.title}</h3>
        <span>{goal.timeframe}</span>
      </div>
      <p>{goal.description}</p>
      <div className="goal-card__progress">
        <div className="goal-card__bar">
          <span style={{ width: `${goal.progress}%` }} />
        </div>
        <strong>{goal.progress}%</strong>
      </div>
    </div>
    <div className="goal-card__meta">
      <span className="pill">Target {new Date(goal.targetDate).toLocaleDateString()}</span>
      <span className="pill" style={{ borderColor: categoryColor, color: categoryColor }}>
        {categoryName}
      </span>
      <span className="pill">Theme: {goal.theme}</span>
    </div>
    <div className="goal-card__actions">
      <button type="button" onClick={() => onToggle(goal.id)}>
        {goal.completed ? 'Completed' : 'Mark complete'}
      </button>
      <button type="button" onClick={() => onEdit(goal)} className="ghost">
        Edit
      </button>
      <button type="button" onClick={() => onDelete(goal.id)} className="ghost">
        Delete
      </button>
    </div>
  </article>
)

export default GoalCard
