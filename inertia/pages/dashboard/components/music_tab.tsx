import { useState } from 'react'
import { PlayIcon, PauseIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import { Card, CardContent } from '@/components/ui/card'

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
    <Card className="py-4 h-full flex flex-col gap-4">
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Input
            className="w-full"
            placeholder="Lien de la musique"
            value={url}
            onChange={(event) => setUrl(event.currentTarget.value)}
          />
          <Button className="hover:bg-stone-500" onClick={() => handleAction('change', { url })}>
            Send
          </Button>
        </div>
        <div className="text-sm text-red-500">
          Attention: La musique sera jouée sur toutes les pages ouvertes.
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="bg-green-500 hover:bg-green-600 flex-1"
            onClick={() => handleAction('play')}
          >
            <PlayIcon className="h-4 w-4" />
            Play
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 flex-1"
            onClick={() => handleAction('pause')}
          >
            <PauseIcon className="h-4 w-4" />
            Pause
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
