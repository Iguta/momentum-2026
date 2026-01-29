import type { ReactNode } from 'react'
import './Header.css'

interface HeaderProps {
  title: string
  subtitle: string
  primaryAction?: ReactNode
}

const Header = ({ title, subtitle, primaryAction }: HeaderProps) => (
  <header className="header">
    <div>
      <p className="header__eyebrow">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
      <h1>{title}</h1>
      <p className="header__subtitle">{subtitle}</p>
    </div>
    {primaryAction && <div className="header__actions">{primaryAction}</div>}
  </header>
)

export default Header
