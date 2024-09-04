import { createContext, useContext, useState, ReactNode } from 'react'
import { subMonths } from 'date-fns'

interface CompetenceContextType {
  competence: Date
  setCompetence: React.Dispatch<React.SetStateAction<Date>>
}

const CompetenceContext = createContext<CompetenceContextType | undefined>(
  undefined,
)

export const CompetenceProvider = ({ children }: { children: ReactNode }) => {
  const [competence, setCompetence] = useState<Date>(subMonths(new Date(), 1)) // Valor inicial

  return (
    <CompetenceContext.Provider value={{ competence, setCompetence }}>
      {children}
    </CompetenceContext.Provider>
  )
}

export const useCompetence = () => {
  const context = useContext(CompetenceContext)
  if (!context) {
    throw new Error('useCompetence must be used within a CompetenceProvider')
  }
  return context
}
