import { useState, type FormEvent } from 'react'
import type { Category, CategoryType } from '../types/category'
import './CategoryManager.css'

interface CategoryManagerProps {
  title: string
  type: CategoryType
  categories: Category[]
  onCreate: (category: Category) => void
  onDelete: (id: string) => void
}

const CategoryManager = ({ title, type, categories, onCreate, onDelete }: CategoryManagerProps) => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#6ee7f9')

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!name.trim()) return
    onCreate({
      id: `${type}-cat-${Date.now()}`,
      name: name.trim(),
      type,
      color,
    })
    setName('')
  }

  return (
    <div className="category-manager">
      <div className="category-manager__header">
        <h3>{title}</h3>
        <p>Custom tags keep everything intentional.</p>
      </div>
      <form className="category-manager__form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
        />
        <input
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          aria-label="Pick category color"
        />
        <button type="submit">Add</button>
      </form>
      <div className="category-manager__list">
        {categories.map((category) => (
          <div key={category.id} className="category-manager__item">
            <span style={{ backgroundColor: category.color }} />
            <p>{category.name}</p>
            <button type="button" onClick={() => onDelete(category.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryManager
