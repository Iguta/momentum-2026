import './Sidebar.css'

interface NavItem {
  id: string
  label: string
  icon: string
}

interface SidebarProps {
  items: NavItem[]
  active: string
  onSelect: (id: string) => void
}

const Sidebar = ({ items, active, onSelect }: SidebarProps) => (
  <aside className="sidebar">
    <div className="sidebar__brand">
      <span className="sidebar__logo">◆</span>
      <div>
        <p className="sidebar__title">Momentum</p>
        <span className="sidebar__subtitle">2026 Focus</span>
      </div>
    </div>
    <nav className="sidebar__nav">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`sidebar__link ${active === item.id ? 'is-active' : ''}`}
          onClick={() => onSelect(item.id)}
        >
          <span className="sidebar__icon" aria-hidden>
            {item.icon}
          </span>
          {item.label}
        </button>
      ))}
    </nav>
    <div className="sidebar__footer">
      <p>Calm productivity starts here.</p>
      <span>Dark mode · Always on</span>
    </div>
  </aside>
)

export default Sidebar
