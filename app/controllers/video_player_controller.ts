import type { HttpContext } from '@adonisjs/core/http'
import transmit from '@adonisjs/transmit/services/main'
import vine from '@vinejs/vine'

export default class VideoPlayerController {
  static validator = vine.compile(
    vine.object({ type: vine.string(), payload: vine.any().optional() })
  )

  async execute({ request, response }: HttpContext) {
    const payload = await request.validateUsing(VideoPlayerController.validator)

    transmit.broadcast('video/player', payload)

    return response.noContent()
  }
}
