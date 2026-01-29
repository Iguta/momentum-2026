import './StatCard.css'

interface StatCardProps {
  label: string
  value: string
  trend?: string
}

const StatCard = ({ label, value, trend }: StatCardProps) => (
  <div className="stat-card">
    <span>{label}</span>
    <strong>{value}</strong>
    {trend && <p>{trend}</p>}
  </div>
)

export default StatCard
