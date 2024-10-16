'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { addYears, format, subMonths, subYears } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useCompetence } from './context/competence-context'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function CompetenceSwitcher() {
  const { slug: currentCo } = useParams<{ slug: string }>()
  const queryClient = useQueryClient()
  const { setCompetence } = useCompetence()

  const [year, setYear] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(
    subMonths(new Date(), 1).getMonth(),
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDate = localStorage.getItem('selectedDate')
      if (savedDate) {
        const savedDateObj = new Date(savedDate)
        setYear(savedDateObj)
        setSelectedMonth(savedDateObj.getMonth())
      }
    }
  }, [])

  useEffect(() => {
    const newDate = new Date(year.getFullYear(), selectedMonth)

    setCompetence(newDate)

    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedDate', newDate.toISOString())
    }

    queryClient.invalidateQueries({
      queryKey: ['tables', newDate.toISOString(), currentCo],
    })
  }, [year, selectedMonth, setCompetence, queryClient, currentCo])

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {format(new Date(year.getFullYear(), selectedMonth), 'MM/yyyy')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-none">
        <div className="border justify-center flex flex-col items-center rounded-md rounded-t-xl gap-3">
          <div className="flex justify-around w-full bg-primary rounded-t-xl py-2 items-center">
            <Button
              onClick={() => setYear(subYears(year, 1))}
              aria-label="Ano Anterior"
            >
              <ChevronLeft />
            </Button>
            <span>{year.getFullYear()}</span>
            <Button
              onClick={() => setYear(addYears(year, 1))}
              aria-label="Próximo Ano"
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4 py-4 uppercase px-2">
            {[
              'Jan',
              'Fev',
              'Mar',
              'Abr',
              'Mai',
              'Jun',
              'Jul',
              'Ago',
              'Set',
              'Out',
              'Nov',
              'Dez',
            ].map((month, index) => (
              <Button
                key={index}
                variant={selectedMonth === index ? 'default' : 'ghost'}
                onClick={() => handleMonthClick(index)}
                aria-label={`Selecionar ${month}`}
              >
                {month}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
