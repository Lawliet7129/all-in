import { useState } from 'react'

interface Event {
  id: string
  title: string
  date: Date
  type: 'anniversary' | 'date' | 'flight' | 'other'
}

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([])

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    }
    setEvents([...events, newEvent])
  }

  return (
    <div className="fixed top-4 right-4 w-80 bg-surface rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Our Calendar</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-background rounded-lg p-3">
            <div className="font-semibold">{event.title}</div>
            <div className="text-sm text-gray-400">
              {event.date.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      {/* TODO: Add event creation form */}
    </div>
  )
} 