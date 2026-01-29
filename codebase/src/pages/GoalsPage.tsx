import { useMemo, useState } from 'react'
import CategoryManager from '../components/CategoryManager'
import GoalCard from '../components/GoalCard'
import GoalForm from '../components/GoalForm'
import Header from '../components/Header'
import { useCategories } from '../hooks/useCategories'
import { useGoals } from '../hooks/useGoals'
import type { Goal } from '../types/goal'

const GoalsPage = () => {
  const { goals, createGoal, editGoal, removeGoal, toggleGoal } = useGoals()
  const { categories, createCategory, deleteCategory } = useCategories('goal')
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [filter, setFilter] = useState('All')

  const filteredGoals = useMemo(() => {
    if (filter === 'All') return goals
    return goals.filter((goal) => goal.timeframe === filter)
  }, [goals, filter])

  const categoryLookup = useMemo(() => {
    return categories.reduce<Record<string, { name: string; color: string }>>((acc, category) => {
      acc[category.id] = { name: category.name, color: category.color }
      return acc
    }, {})
  }, [categories])

  return (
    <div className="page">
      <Header
        title="Goal Setting"
        subtitle="Define what matters this year, this month, and today."
      />

      <section className="panel">
        <GoalForm
          categories={categories}
          onSubmit={(goal) => {
            if (editingGoal) {
              editGoal(goal)
              setEditingGoal(null)
            } else {
              createGoal(goal)
            }
          }}
          onCancel={() => setEditingGoal(null)}
          editingGoal={editingGoal}
        />
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <h2>Goal library</h2>
            <p>Track progress across time horizons and themes.</p>
          </div>
          <div className="panel__controls">
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="All">All timeframes</option>
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
            </select>
          </div>
        </div>
        <div className="goal-grid">
          {filteredGoals.map((goal) => {
            const category = categoryLookup[goal.categoryId] || {
              name: 'Unassigned',
              color: 'rgba(148, 163, 184, 0.6)',
            }
            return (
              <GoalCard
                key={goal.id}
                goal={goal}
                categoryName={category.name}
                categoryColor={category.color}
                onEdit={setEditingGoal}
                onDelete={removeGoal}
                onToggle={toggleGoal}
              />
            )
          })}
          {filteredGoals.length === 0 && <p className="empty-state">No goals yet. Add one above.</p>}
        </div>
      </section>

      <section className="grid grid--two">
        <CategoryManager
          title="Goal categories"
          type="goal"
          categories={categories}
          onCreate={createCategory}
          onDelete={deleteCategory}
        />
        <div className="panel panel--soft">
          <h2>Theme suggestions</h2>
          <p>
            Mix themes to keep your year balanced. Consider adding a spiritual, fitness, and career
            goal each quarter to stay aligned.
          </p>
          <ul>
            <li>Spiritual: meditation, gratitude, service</li>
            <li>Physical Fitness: movement, nutrition, recovery</li>
            <li>Academics: courses, reading lists, certifications</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default GoalsPage
