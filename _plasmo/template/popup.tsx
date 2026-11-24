import { useState } from 'react'
import { Button } from './components/button'
import type { ExtensionStatus } from './core/status'
import './style.css'

export default function Popup() {
  const [status, setStatus] = useState('Ready')
  return (
    <main className="grid gap-4 p-5">
      <div><p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Plasmo starter</p><h1 className="text-xl font-semibold">{{NAME}}</h1></div>
      <p className="text-sm text-zinc-300">{status}</p>
      <Button onClick={async () => setStatus(((await chrome.runtime.sendMessage({ type: 'get-status' })) as ExtensionStatus).ready ? 'Background connected' : 'Unavailable')}>
        Check background
      </Button>
    </main>
  )
}
