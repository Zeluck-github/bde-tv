import { CalendarDaysIcon, ClockIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { formatDate, formatDateHumanReadeble, getDuration } from '@/lib/date'
import { DateTime } from '@/lib/luxon'
import { cn } from '@/lib/utils'
import type { Event } from '@/types'

interface EventCardProps extends React.ComponentProps<typeof Card> {
  event: Event
}

export function EventCard({ event, className, ...props }: EventCardProps) {
  return (
    <Card className={cn('transition-all hover:shadow-lg h-full text-xl', className)} {...props}>
      <CardContent className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between">
          <CardTitle className="text-2xl font-normal leading-tight">{event.title}</CardTitle>
          <Badge variant="secondary" className="ml-2 text-lg text-nowrap py-1 px-2">
            <ClockIcon className="w-5 h-5 mr-1" />
            {getDuration(event.startAt, event.endAt)}
          </Badge>
        </div>
        <div className="flex items-center text-lg text-muted-foreground mt-2">
          <CalendarDaysIcon className="w-5 h-5 mr-1" />
          <span>
            {formatDateHumanReadeble(event.startAt, DateTime.DATE_MED)}
            {event.startAt !== event.endAt && ` - ${formatDate(event.endAt, DateTime.DATE_MED)}`}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}