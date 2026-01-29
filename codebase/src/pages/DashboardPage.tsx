import { useMemo } from 'react'
import Header from '../components/Header'
import ProgressChart from '../components/ProgressChart'
import StatCard from '../components/StatCard'
import { useGoals } from '../hooks/useGoals'
import { useTasks } from '../hooks/useTasks'
import { formatDateLabel, getMonthRange, getWeekRange, getYearRange, isSameDay } from '../utils/dateUtils'

const DashboardPage = () => {
  const { tasks } = useTasks()
  const { goals } = useGoals()
  const today = new Date()

  const stats = useMemo(() => {
    const todayTasks = tasks.filter((task) => isSameDay(new Date(task.dueDate), today))
    const { start: weekStart, end: weekEnd } = getWeekRange(today)
    const weekTasks = tasks.filter((task) => {
      const due = new Date(task.dueDate)
      return due >= weekStart && due <= weekEnd
    })
    const { start: monthStart, end: monthEnd } = getMonthRange(today)
    const monthTasks = tasks.filter((task) => {
      const due = new Date(task.dueDate)
      return due >= monthStart && due <= monthEnd
    })
    const { start: yearStart, end: yearEnd } = getYearRange(today)
    const yearTasks = tasks.filter((task) => {
      const due = new Date(task.dueDate)
      return due >= yearStart && due <= yearEnd
    })

    const completionRate = (list: typeof tasks) =>
      list.length ? Math.round((list.filter((task) => task.completed).length / list.length) * 100) : 0

    return {
      todayTasks,
      weekTasks,
      monthTasks,
      yearTasks,
      completionRate,
    }
  }, [tasks, today])

  const topGoals = goals
    .filter((goal) => !goal.completed)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3)

  return (
    <div className="page">
      <Header
        title="Momentum Dashboard"
        subtitle="Your calm overview for the year ahead."
      />

      <section className="grid grid--stats">
        <StatCard label="Tasks due today" value={`${stats.todayTasks.length}`} trend={`${stats.completionRate(stats.todayTasks)}% complete`} />
        <StatCard label="Week focus" value={`${stats.weekTasks.length}`} trend={`${stats.completionRate(stats.weekTasks)}% complete`} />
        <StatCard label="Month alignment" value={`${stats.monthTasks.length}`} trend={`${stats.completionRate(stats.monthTasks)}% complete`} />
        <StatCard label="Year journey" value={`${stats.yearTasks.length}`} trend={`${stats.completionRate(stats.yearTasks)}% complete`} />
      </section>

      <section className="grid grid--charts">
        <ProgressChart
          label="Today"
          value={stats.completionRate(stats.todayTasks)}
          helper={`Tasks due ${formatDateLabel(today)}`}
        />
        <ProgressChart
          label="This Week"
          value={stats.completionRate(stats.weekTasks)}
          helper="Keep the week balanced"
        />
        <ProgressChart
          label="This Month"
          value={stats.completionRate(stats.monthTasks)}
          helper="Monthly consistency"
        />
        <ProgressChart
          label="This Year"
          value={stats.completionRate(stats.yearTasks)}
          helper="Long-range momentum"
        />
      </section>

      <section className="panel">
        <div className="panel__header">
          <div>
            <h2>Goal focus</h2>
            <p>Top goals to keep in view today.</p>
          </div>
          <span className="panel__pill">{goals.length} active goals</span>
        </div>
        <div className="panel__content">
          {topGoals.map((goal) => (
            <div key={goal.id} className="focus-card">
              <div>
                <h3>{goal.title}</h3>
                <p>{goal.description}</p>
              </div>
              <div className="focus-card__meta">
                <span>{goal.theme}</span>
                <strong>{goal.progress}%</strong>
              </div>
            </div>
          ))}
          {topGoals.length === 0 && <p className="empty-state">No active goals yet.</p>}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
