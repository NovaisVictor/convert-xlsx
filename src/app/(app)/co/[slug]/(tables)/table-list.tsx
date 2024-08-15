import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ArrowRight } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { getCurrentCo } from '@/app/auth/auth'
import { getTables } from '@/http/get-tables'

dayjs.extend(relativeTime)

export async function TableList() {
  const currentCo = getCurrentCo()

  const { tables } = await getTables(currentCo!)

  return (
    <div className="grid grid-cols-3 gap-4">
      {tables.map((table) => {
        return (
          <Card key={table.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                {table.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 leading-relaxed">
                {table.competence.slice(0, 2)}/{table.competence.slice(2, 6)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center gap-1.5">
              <Avatar className="size-4">
                {table.owner.avatarUrl && (
                  <AvatarImage src={table.owner.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>
              <span className="truncate text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {table.ownerId}
                </span>
                {dayjs(table.createdAt).fromNow()}
              </span>

              <Button size={'xs'} variant={'outline'} className="ml-auto">
                View <ArrowRight className="ml-2 size-3" />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}