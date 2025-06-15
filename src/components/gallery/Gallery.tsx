import { useState } from 'react'

interface Memory {
  id: string
  title: string
  description: string
  imageUrl: string
  date: Date
  tags: string[]
}

export default function Gallery() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const addMemory = (memory: Omit<Memory, 'id'>) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now().toString(),
    }
    setMemories([...memories, newMemory])
  }

  return (
    <div className="fixed top-4 left-4 w-80 bg-surface rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Our Memories</h2>
      <div className="grid grid-cols-2 gap-4">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="bg-background rounded-lg overflow-hidden cursor-pointer"
            onClick={() => setSelectedMemory(memory)}
          >
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-2">
              <div className="font-semibold">{memory.title}</div>
              <div className="text-sm text-gray-400">
                {memory.date.toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-surface rounded-lg p-4 max-w-2xl">
            <img
              src={selectedMemory.imageUrl}
              alt={selectedMemory.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{selectedMemory.title}</h3>
            <p className="text-gray-400 mb-4">{selectedMemory.description}</p>
            <div className="flex flex-wrap gap-2">
              {selectedMemory.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary rounded-full px-3 py-1 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => setSelectedMemory(null)}
              className="mt-4 bg-primary rounded-lg px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 