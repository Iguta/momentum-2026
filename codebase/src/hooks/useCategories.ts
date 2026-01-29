import { useEffect, useState } from 'react'
import type { Category, CategoryType } from '../types/category'
import { addCategory, getCategories, removeCategory, saveCategories } from '../services/categoryService'

export const useCategories = (type?: CategoryType) => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(getCategories(type))
  }, [type])

  const createCategory = (category: Category) => {
    const next = addCategory(category)
    setCategories(type ? next.filter((item) => item.type === type) : next)
  }

  const deleteCategory = (categoryId: string) => {
    const next = removeCategory(categoryId)
    setCategories(type ? next.filter((item) => item.type === type) : next)
  }

  const updateAllCategories = (next: Category[]) => {
    saveCategories(next)
    setCategories(type ? next.filter((item) => item.type === type) : next)
  }

  return {
    categories,
    createCategory,
    deleteCategory,
    updateAllCategories,
  }
}
