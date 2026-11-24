import { useState } from 'react'
import { Button } from '../../components/button'
import { sendMessage } from '../../core/messages'

export function App() {
  const [status, setStatus] = useState('Ready')
  return (
    <main className="grid gap-4 p-5">
      <div><p className="text-xs uppercase tracking-[0.2em] text-zinc-400">WXT starter</p><h1 className="text-xl font-semibold">{{NAME}}</h1></div>
      <p className="text-sm text-zinc-300">{status}</p>
      <Button onClick={async () => setStatus((await sendMessage('getStatus', undefined)).ready ? 'Background connected' : 'Unavailable')}>
        Check background
      </Button>
    </main>
  )
}
