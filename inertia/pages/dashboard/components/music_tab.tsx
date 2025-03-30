import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'

export function MusicTab() {
  const [url, setUrl] = useState('')

  const handleAction = async (type: string, payload?: any) => {
    await client.post('video/player', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, payload }),
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <Button onClick={() => handleAction('play')}>Play</Button>
        <Button onClick={() => handleAction('pause')}>Pause</Button>
        <div className="*:not-first:mt-2">
          <div className="flex rounded-md shadow-xs">
            <Input
              className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
              placeholder="URL de la musique"
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
            />
            <button
              className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleAction('change', { url })}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
