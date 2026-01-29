import { useEffect, useState, type FormEvent } from 'react'
import type { Goal, GoalTheme, GoalTimeframe } from '../types/goal'
import type { Category } from '../types/category'
import './GoalForm.css'

const themeOptions: GoalTheme[] = [
  'Spiritual',
  'Physical Fitness',
  'Academics',
  'Career',
  'Personal Growth',
  'Relationships',
]

interface GoalFormProps {
  categories: Category[]
  onSubmit: (goal: Goal) => void
  onCancel: () => void
  editingGoal?: Goal | null
}

const emptyGoal = (categoryId: string): Goal => ({
  id: '',
  title: '',
  description: '',
  timeframe: 'Monthly',
  theme: 'Personal Growth',
  categoryId,
  targetDate: new Date().toISOString(),
  progress: 0,
  completed: false,
  createdAt: new Date().toISOString(),
})

const toIsoDate = (value: string) => (value ? new Date(value).toISOString() : '')

const GoalForm = ({ categories, onSubmit, onCancel, editingGoal }: GoalFormProps) => {
  const [goal, setGoal] = useState<Goal>(() => emptyGoal(categories[0]?.id ?? ''))

  useEffect(() => {
    if (editingGoal) {
      setGoal(editingGoal)
    } else {
      setGoal(emptyGoal(categories[0]?.id ?? ''))
    }
  }, [editingGoal, categories])

  const handleChange = (field: keyof Goal, value: string | number | boolean) => {
    setGoal((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextGoal: Goal = {
      ...goal,
      id: goal.id || `goal-${Date.now()}`,
      createdAt: goal.createdAt || new Date().toISOString(),
    }
    onSubmit(nextGoal)
    if (!editingGoal) {
      setGoal(emptyGoal(categories[0]?.id ?? ''))
    }
  }

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <div className="goal-form__grid">
        <label>
          Goal title
          <input
            value={goal.title}
            onChange={(event) => handleChange('title', event.target.value)}
            placeholder="Add a clear goal"
            required
          />
        </label>
        <label>
          Target date
          <input
            type="date"
            value={goal.targetDate.slice(0, 10)}
            onChange={(event) => handleChange('targetDate', toIsoDate(event.target.value))}
            required
          />
        </label>
        <label className="goal-form__full">
          Description
          <textarea
            value={goal.description}
            onChange={(event) => handleChange('description', event.target.value)}
            placeholder="Describe the outcome"
            rows={3}
            required
          />
        </label>
        <label>
          Timeframe
          <select
            value={goal.timeframe}
            onChange={(event) => handleChange('timeframe', event.target.value as GoalTimeframe)}
          >
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
          </select>
        </label>
        <label>
          Theme
          <select
            value={goal.theme}
            onChange={(event) => handleChange('theme', event.target.value as GoalTheme)}
          >
            {themeOptions.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </select>
        </label>
        <label>
          Progress %
          <input
            type="number"
            min={0}
            max={100}
            value={goal.progress}
            onChange={(event) => handleChange('progress', Number(event.target.value))}
          />
        </label>
        <label>
          Category
          <select
            value={goal.categoryId}
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
      <div className="goal-form__actions">
        <button type="submit">{editingGoal ? 'Update Goal' : 'Add Goal'}</button>
        {editingGoal && (
          <button type="button" className="ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default GoalForm
