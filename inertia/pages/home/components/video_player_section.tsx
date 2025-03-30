import { Infer } from '@vinejs/vine/types'
import { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'

import type VideoPlayerController from '#controllers/video_player_controller'
import { transmit } from '@/lib/transmit'

type Payload = Infer<typeof VideoPlayerController.validator>

export function VideoPlayerSection() {
  const playerRef = useRef<ReactPlayer | null>(null)

  const [state, setState] = useState({
    url: 'https://www.youtube.com/watch?v=DtMwi32al7s',
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  })

  useEffect(() => {
    const subscription = transmit.subscription('video/player')

    const unsbuscribe = subscription.onMessage((data: Payload) => {
      switch (data.type) {
        case 'play':
          setState((prev) => ({ ...prev, playing: true }))
          break
        case 'pause':
          setState((prev) => ({ ...prev, playing: false }))
          break
        case 'stop':
          setState((prev) => ({ ...prev, playing: false }))
          playerRef.current?.seekTo(0)
          break
        case 'change':
          playerRef.current?.seekTo(0)
          setState((prev) => ({ ...prev, url: data.payload.url, playing: true }))
          break
        default:
          break
      }
    })

    subscription.create()

    return () => {
      unsbuscribe()
      subscription.delete()
    }
  }, [])

  return (
    <div className="flex flex-col justify-center flex-1">
      <div className="aspect-video">
        <ReactPlayer ref={playerRef} width="100%" height="100%" {...state} />
      </div>
    </div>
  )
}
