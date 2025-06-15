import { useState, useEffect } from 'react'

interface TimeZoneClockProps {
  timeZone: string
  label: string
}

export default function TimeZoneClock({ timeZone, label }: TimeZoneClockProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    timeZone,
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="bg-surface rounded-lg p-4 text-center">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-bold">{formattedTime}</div>
      <div className="text-sm text-gray-400">{timeZone}</div>
    </div>
  )
} 