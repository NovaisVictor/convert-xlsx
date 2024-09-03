'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { useState, useEffect } from 'react'
import { addYears, format, subMonths, subYears } from 'date-fns'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

export function CompetenceSwitcher() {
  const [year, setYear] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(
    subMonths(new Date(), 1).getMonth(),
  )
  const [selectedDate, setSelectedDate] = useState(
    new Date(year.getFullYear(), selectedMonth),
  )

  useEffect(() => {
    setSelectedDate(new Date(year.getFullYear(), selectedMonth))
  }, [year, selectedMonth])

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{format(selectedDate, 'MM/yyyy')}</Button>
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
          <div className="py-2">
            <span>
              Data Selecionada: {selectedDate.toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
