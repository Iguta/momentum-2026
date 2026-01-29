import { useMemo, useState } from 'react'
import CalendarGrid from '../components/CalendarGrid'
import Header from '../components/Header'
import { useTasks } from '../hooks/useTasks'
import { formatLongDate, isSameDay } from '../utils/dateUtils'

const CalendarPage = () => {
  const { tasks } = useTasks()
  const [month, setMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const selectedTasks = useMemo(() => {
    if (!selectedDate) return []
    return tasks.filter((task) => isSameDay(new Date(task.dueDate), selectedDate))
  }, [tasks, selectedDate])

  const handleMonthChange = (direction: 'prev' | 'next') => {
    const next = new Date(month)
    next.setMonth(month.getMonth() + (direction === 'next' ? 1 : -1))
    setMonth(next)
  }

  return (
    <div className="page">
      <Header
        title="Calendar View"
        subtitle="Zoom into days that carry the most intent."
        primaryAction={
          <div className="calendar-controls">
            <button type="button" onClick={() => handleMonthChange('prev')}>
              ← Previous
            </button>
            <span>
              {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button type="button" onClick={() => handleMonthChange('next')}>
              Next →
            </button>
          </div>
        }
      />

      <section className="calendar-layout">
        <div className="panel">
          <CalendarGrid month={month} tasks={tasks} selectedDate={selectedDate} onSelect={setSelectedDate} />
        </div>
        <div className="panel panel--soft">
          <div className="panel__header">
            <div>
              <h2>{selectedDate ? formatLongDate(selectedDate) : 'Select a day'}</h2>
              <p>Expanded view of tasks for the day.</p>
            </div>
            <span className="panel__pill">{selectedTasks.length} tasks</span>
          </div>
          <div className="calendar-tasks">
            {selectedTasks.map((task) => (
              <div key={task.id} className="calendar-task">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <span className={`calendar-task__status ${task.completed ? 'is-complete' : ''}`}>
                  {task.completed ? 'Completed' : 'In progress'}
                </span>
              </div>
            ))}
            {selectedTasks.length === 0 && (
              <p className="empty-state">No tasks scheduled. Add a task or pick another day.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CalendarPage
