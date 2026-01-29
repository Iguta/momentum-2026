export type CategoryType = 'task' | 'goal'

export interface Category {
  id: string
  name: string
  type: CategoryType
  color: string
}
