import type { Task } from '../types/task'
import { isSameDay } from '../utils/dateUtils'
import './CalendarGrid.css'

interface CalendarGridProps {
  month: Date
  tasks: Task[]
  selectedDate: Date | null
  onSelect: (date: Date) => void
}

const getDaysInMonth = (month: Date) => {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const first = new Date(year, monthIndex, 1)
  const last = new Date(year, monthIndex + 1, 0)
  const days: Date[] = []

  for (let i = 0; i < first.getDay(); i += 1) {
    days.push(new Date(year, monthIndex, i - first.getDay() + 1))
  }

  for (let day = 1; day <= last.getDate(); day += 1) {
    days.push(new Date(year, monthIndex, day))
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i += 1) {
    days.push(new Date(year, monthIndex + 1, i))
  }

  return days
}

const CalendarGrid = ({ month, tasks, selectedDate, onSelect }: CalendarGridProps) => {
  const days = getDaysInMonth(month)
  const monthIndex = month.getMonth()

  return (
    <div className="calendar-grid">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
        <div key={label} className="calendar-grid__weekday">
          {label}
        </div>
      ))}
      {days.map((day) => {
        const dayTasks = tasks.filter((task) => isSameDay(new Date(task.dueDate), day))
        const isCurrentMonth = day.getMonth() === monthIndex
        const isSelected = selectedDate && isSameDay(selectedDate, day)
        return (
          <button
            type="button"
            key={day.toISOString()}
            className={`calendar-grid__day ${isCurrentMonth ? '' : 'is-muted'} ${
              dayTasks.length > 0 ? 'has-tasks' : ''
            } ${isSelected ? 'is-selected' : ''}`}
            onClick={() => onSelect(day)}
          >
            <span>{day.getDate()}</span>
            {dayTasks.length > 0 && (
              <div className="calendar-grid__badge">
                {dayTasks.length} task{dayTasks.length === 1 ? '' : 's'}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default CalendarGrid
