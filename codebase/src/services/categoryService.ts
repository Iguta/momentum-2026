import type { Category, CategoryType } from '../types/category'
import { loadFromStorage, saveToStorage } from './storage'

const CATEGORY_KEY = 'momentum.categories'

const seedCategories: Category[] = [
  { id: 'task-cat-1', name: 'Planning', type: 'task', color: '#6EE7F9' },
  { id: 'task-cat-2', name: 'Wellness', type: 'task', color: '#A78BFA' },
  { id: 'goal-cat-1', name: 'Growth', type: 'goal', color: '#FBBF24' },
  { id: 'goal-cat-2', name: 'Health', type: 'goal', color: '#34D399' },
]

export const getCategories = (type?: CategoryType) => {
  const categories = loadFromStorage<Category[]>(CATEGORY_KEY, seedCategories)
  if (!type) return categories
  return categories.filter((item) => item.type === type)
}

export const saveCategories = (categories: Category[]) =>
  saveToStorage(CATEGORY_KEY, categories)

export const addCategory = (category: Category) => {
  const categories = getCategories()
  const next = [category, ...categories]
  saveCategories(next)
  return next
}

export const removeCategory = (categoryId: string) => {
  const categories = getCategories().filter((item) => item.id !== categoryId)
  saveCategories(categories)
  return categories
}
