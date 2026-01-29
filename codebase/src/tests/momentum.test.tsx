import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarPage from '../pages/CalendarPage'
import DashboardPage from '../pages/DashboardPage'
import GoalsPage from '../pages/GoalsPage'
import TasksPage from '../pages/TasksPage'

describe('momentum-2026 must-have flows', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('adds a task with description, due date, and priority weight', async () => {
    const user = userEvent.setup()
    render(<TasksPage />)

    await user.type(screen.getByLabelText('Title'), 'Design weekly focus')
    await user.type(screen.getByLabelText('Description'), 'Outline the three core outcomes.')
    await user.clear(screen.getByLabelText('Due date'))
    await user.type(screen.getByLabelText('Due date'), '2026-01-30')
    await user.selectOptions(screen.getByLabelText('Priority'), 'High')
    await user.clear(screen.getByLabelText('Weight'))
    await user.type(screen.getByLabelText('Weight'), '5')

    await user.click(screen.getByRole('button', { name: 'Add Task' }))

    expect(screen.getByText('Design weekly focus')).toBeInTheDocument()
    const taskCard = screen.getByText('Design weekly focus').closest('article')
    expect(taskCard).not.toBeNull()
    if (taskCard) {
      expect(within(taskCard).getByText('Weight 5')).toBeInTheDocument()
    }
  })

  it('creates a goal across yearly/monthly/daily timeframes', async () => {
    const user = userEvent.setup()
    render(<GoalsPage />)

    await user.type(screen.getByLabelText('Goal title'), 'Launch portfolio')
    await user.type(screen.getByLabelText('Description'), 'Ship three refined case studies.')
    await user.clear(screen.getByLabelText('Target date'))
    await user.type(screen.getByLabelText('Target date'), '2026-06-01')
    await user.selectOptions(screen.getByLabelText('Timeframe'), 'Yearly')
    await user.selectOptions(screen.getByLabelText('Theme'), 'Career')
    await user.clear(screen.getByLabelText('Progress %'))
    await user.type(screen.getByLabelText('Progress %'), '20')

    await user.click(screen.getByRole('button', { name: 'Add Goal' }))

    expect(screen.getByText('Launch portfolio')).toBeInTheDocument()
    expect(screen.getByText('20%')).toBeInTheDocument()
  })

  it('renders the calendar view with a zoomable day list', () => {
    render(<CalendarPage />)

    expect(screen.getByText('Calendar View')).toBeInTheDocument()
    expect(screen.getByText('Plan January focus goals')).toBeInTheDocument()
  })

  it('shows progress dashboards for today, week, month, and year', () => {
    render(<DashboardPage />)

    expect(screen.getByText('Tasks due today')).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('This Week')).toBeInTheDocument()
    expect(screen.getByText('This Month')).toBeInTheDocument()
    expect(screen.getByText('This Year')).toBeInTheDocument()
  })
})
