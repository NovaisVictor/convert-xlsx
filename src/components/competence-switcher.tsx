import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function CompetenceSwitcher() {
  return (
    <Select>
      <SelectTrigger className="flex w-[180px] justify-center gap-3 rounded-full">
        <SelectValue placeholder="Competência" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="01">Janeiro</SelectItem>
        <SelectItem value="02">Fevereiro</SelectItem>
        <SelectItem value="03">Março</SelectItem>
        <SelectItem value="04">Abril</SelectItem>
        <SelectItem value="05">Maio</SelectItem>
        <SelectItem value="06">Junho</SelectItem>
        <SelectItem value="07">Julho</SelectItem>
        <SelectItem value="08">Agosto</SelectItem>
        <SelectItem value="09">Setembro</SelectItem>
        <SelectItem value="10">Outubro</SelectItem>
        <SelectItem value="11">Novembro</SelectItem>
        <SelectItem value="12">Dezembro</SelectItem>
      </SelectContent>
    </Select>
  )
}
