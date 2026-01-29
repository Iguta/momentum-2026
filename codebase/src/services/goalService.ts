import type { Goal } from '../types/goal'
import { loadFromStorage, saveToStorage } from './storage'

const GOALS_KEY = 'momentum.goals'

const seedGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Complete 12 books in 2026',
    description: 'Read one book every month to deepen focus.',
    timeframe: 'Yearly',
    theme: 'Personal Growth',
    categoryId: 'goal-cat-1',
    targetDate: new Date(new Date().getFullYear(), 11, 31).toISOString(),
    progress: 35,
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goal-2',
    title: 'Daily movement streak',
    description: '30 minutes of activity each day.',
    timeframe: 'Daily',
    theme: 'Physical Fitness',
    categoryId: 'goal-cat-2',
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
    progress: 72,
    completed: false,
    createdAt: new Date().toISOString(),
  },
]

export const getGoals = () => loadFromStorage<Goal[]>(GOALS_KEY, seedGoals)

export const saveGoals = (goals: Goal[]) => saveToStorage(GOALS_KEY, goals)

export const addGoal = (goal: Goal) => {
  const goals = getGoals()
  const next = [goal, ...goals]
  saveGoals(next)
  return next
}

export const updateGoal = (goal: Goal) => {
  const goals = getGoals().map((item) => (item.id === goal.id ? goal : item))
  saveGoals(goals)
  return goals
}

export const deleteGoal = (goalId: string) => {
  const goals = getGoals().filter((item) => item.id !== goalId)
  saveGoals(goals)
  return goals
}
