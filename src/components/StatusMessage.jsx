export default function StatusMessage({ type = 'info', children }) {
  const color = type === 'error' ? 'border-red-400 bg-red-500/10' : 'border-line bg-card text-muted'
  return <div role={type === 'error' ? 'alert' : 'status'} className={`rounded-xl border p-4 ${color}`}>{children}</div>
}
