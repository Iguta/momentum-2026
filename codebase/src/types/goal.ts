export type GoalTimeframe = 'Yearly' | 'Monthly' | 'Daily'

export type GoalTheme =
  | 'Spiritual'
  | 'Physical Fitness'
  | 'Academics'
  | 'Career'
  | 'Personal Growth'
  | 'Relationships'

export interface Goal {
  id: string
  title: string
  description: string
  timeframe: GoalTimeframe
  theme: GoalTheme
  categoryId: string
  targetDate: string
  progress: number
  completed: boolean
  createdAt: string
}
