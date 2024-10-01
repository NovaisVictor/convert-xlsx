'use client'
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

import Link from 'next/link'
import { getCompaniesTablesAction } from '@/actions/companies/get-companies-tables-action'
import { format } from 'date-fns'
import { useServerActionQuery } from '@/hooks/server-action-hooks'
import { useParams } from 'next/navigation'
import { useCompetence } from '@/components/context/competence-context'
import { Skeleton } from '@/components/ui/skeleton'
dayjs.extend(relativeTime)

export function TableList() {
  const { slug: currentCo } = useParams<{
    slug: string
  }>()

  const { competence } = useCompetence()
  const { isLoading, data } = useServerActionQuery(getCompaniesTablesAction, {
    queryKey: [`tables`, competence, currentCo],
    input: { competence },
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
        <>
          <div className="w-[400px] h-[157px] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col justify-between">
            <div className="flex flex-col space-y-2 p-6">
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-5" />
            </div>
            <div className="flex items-center gap-1.5 p-6 pt-0">
              <Skeleton className="size-4 rounded-full" />
              <Skeleton className="w-20 h-3" />
              <Skeleton className="w-16 h-3" />
              <Skeleton className="w-28 h-5" />
            </div>
          </div>
        </>
      ) : (
        <>
          {data?.tables.map((table) => {
            return (
              <Card key={table.id} className="flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl font-medium">
                    {table.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 leading-relaxed">
                    {format(table.competence, 'MM/yyyy')}
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
                    <span className="font-medium text-foreground mr-2">
                      {table.owner.name}
                    </span>
                    {dayjs(table.createdAt).fromNow()}
                  </span>
                  <Link href={`/co/${currentCo}/table/${table.id}`}>
                    <Button size={'xs'} variant={'outline'} className="ml-auto">
                      Visualizar <ArrowRight className="ml-2 size-3" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </>
      )}
    </div>
  )
}
