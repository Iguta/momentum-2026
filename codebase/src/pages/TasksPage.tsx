import { useMemo, useState } from 'react'
import CategoryManager from '../components/CategoryManager'
import Header from '../components/Header'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useCategories } from '../hooks/useCategories'
import { useTasks } from '../hooks/useTasks'
import type { Priority, Task } from '../types/task'

const priorityOrder: Record<Priority, number> = { High: 3, Medium: 2, Low: 1 }

type SortOption = 'Due Date' | 'Priority' | 'Weight' | 'Created'

const TasksPage = () => {
  const { tasks, createTask, editTask, removeTask, toggleTask } = useTasks()
  const { categories, createCategory, deleteCategory } = useCategories('task')
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'list' | 'card'>('card')
  const [sortBy, setSortBy] = useState<SortOption>('Due Date')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) =>
        `${task.title} ${task.description}`.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((task) => (selectedCategory === 'all' ? true : task.categoryId === selectedCategory))
      .sort((a, b) => {
        if (sortBy === 'Due Date') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        if (sortBy === 'Priority') return priorityOrder[b.priority] - priorityOrder[a.priority]
        if (sortBy === 'Weight') return b.weight - a.weight
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
  }, [tasks, search, selectedCategory, sortBy])

  const categoryLookup = useMemo(() => {
    return categories.reduce<Record<string, { name: string; color: string }>>((acc, category) => {
      acc[category.id] = { name: category.name, color: category.color }
      return acc
    }, {})
  }, [categories])

  return (
    <div className="page">
      <Header
        title="Task Management"
        subtitle="Capture tasks, prioritize with intention, and keep the week flowing."
      />

      <section className="panel">
        <TaskForm
          categories={categories}
          onSubmit={(task) => {
            if (editingTask) {
              editTask(task)
              setEditingTask(null)
            } else {
              createTask(task)
            }
          }}
          onCancel={() => setEditingTask(null)}
          editingTask={editingTask}
        />
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <h2>Task views</h2>
            <p>Switch layouts and refine priority criteria.</p>
          </div>
          <div className="panel__controls">
            <input
              className="search"
              placeholder="Search tasks"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
              <option value="Due Date">Sort: Due Date</option>
              <option value="Priority">Sort: Priority</option>
              <option value="Weight">Sort: Weight</option>
              <option value="Created">Sort: Created</option>
            </select>
            <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="view-toggle">
              <button type="button" className={view === 'card' ? 'is-active' : ''} onClick={() => setView('card')}>
                Cards
              </button>
              <button type="button" className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')}>
                List
              </button>
            </div>
          </div>
        </div>
        <TaskList
          tasks={filteredTasks}
          view={view}
          categoryLookup={categoryLookup}
          onEdit={setEditingTask}
          onDelete={removeTask}
          onToggle={toggleTask}
        />
      </section>

      <section className="grid grid--two">
        <CategoryManager
          title="Task categories"
          type="task"
          categories={categories}
          onCreate={createCategory}
          onDelete={deleteCategory}
        />
        <div className="panel panel--soft">
          <h2>Priority cues</h2>
          <p>
            Use the sort selector to align your day by due date, urgency, or the weight you assign. Keep
            the heaviest tasks at the top to maintain momentum.
          </p>
          <ul>
            <li>High priority + weight 5 = primary focus</li>
            <li>Medium priority + weight 3 = steady progress</li>
            <li>Low priority + weight 1 = background flow</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default TasksPage
