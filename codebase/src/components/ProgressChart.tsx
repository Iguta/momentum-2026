import './ProgressChart.css'

interface ProgressChartProps {
  label: string
  value: number
  helper: string
}

const ProgressChart = ({ label, value, helper }: ProgressChartProps) => (
  <div className="progress-chart">
    <div className="progress-chart__header">
      <span>{label}</span>
      <strong>{value}%</strong>
    </div>
    <div className="progress-chart__track">
      <div className="progress-chart__fill" style={{ width: `${value}%` }} />
    </div>
    <p>{helper}</p>
  </div>
)

export default ProgressChart
