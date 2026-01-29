import { useMemo, useState } from 'react'
import Sidebar from './components/Sidebar'
import CalendarPage from './pages/CalendarPage'
import DashboardPage from './pages/DashboardPage'
import GoalsPage from './pages/GoalsPage'
import TasksPage from './pages/TasksPage'
import './App.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'tasks', label: 'Tasks', icon: '✅' },
  { id: 'goals', label: 'Goals', icon: '🎯' },
  { id: 'calendar', label: 'Calendar', icon: '🗓️' },
]

function App() {
  const [active, setActive] = useState('dashboard')

  const page = useMemo(() => {
    switch (active) {
      case 'tasks':
        return <TasksPage />
      case 'goals':
        return <GoalsPage />
      case 'calendar':
        return <CalendarPage />
      default:
        return <DashboardPage />
    }
  }, [active])

  return (
    <div className="app-shell">
      <Sidebar items={NAV_ITEMS} active={active} onSelect={setActive} />
      <main className="app-main">{page}</main>
    </div>
  )
}

export default App
