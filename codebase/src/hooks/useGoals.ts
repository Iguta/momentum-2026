import { useEffect, useState } from 'react'
import type { Goal } from '../types/goal'
import { addGoal, deleteGoal, getGoals, saveGoals, updateGoal } from '../services/goalService'

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    setGoals(getGoals())
  }, [])

  const createGoal = (goal: Goal) => setGoals(addGoal(goal))

  const editGoal = (goal: Goal) => setGoals(updateGoal(goal))

  const removeGoal = (goalId: string) => setGoals(deleteGoal(goalId))

  const toggleGoal = (goalId: string) => {
    const next = goals.map((goal) =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal,
    )
    setGoals(next)
    saveGoals(next)
  }

  return {
    goals,
    createGoal,
    editGoal,
    removeGoal,
    toggleGoal,
  }
}
