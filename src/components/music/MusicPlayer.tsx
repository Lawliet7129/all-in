import { useState } from 'react'

interface Song {
  id: string
  title: string
  artist: string
  url: string
}

export default function MusicPlayer() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Song[]>([])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const addToPlaylist = (song: Song) => {
    setPlaylist([...playlist, song])
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-surface rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Our Playlist</h2>
      {currentSong && (
        <div className="mb-4">
          <div className="font-semibold">{currentSong.title}</div>
          <div className="text-sm text-gray-400">{currentSong.artist}</div>
          <button
            onClick={togglePlay}
            className="mt-2 bg-primary rounded-lg px-4 py-2"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
        </div>
      )}
      <div className="space-y-2">
        {playlist.map((song) => (
          <div
            key={song.id}
            className="bg-background rounded-lg p-2 cursor-pointer hover:bg-gray-700"
            onClick={() => setCurrentSong(song)}
          >
            <div className="font-semibold">{song.title}</div>
            <div className="text-sm text-gray-400">{song.artist}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 