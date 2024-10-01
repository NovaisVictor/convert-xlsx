'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { FileUploader } from './file-uploader'
import { CircleFadingPlus, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { toast } from 'sonner'
import { useFormState } from '@/hooks/use-form-state'
import { useState } from 'react'
import { convertXlsx } from '@/utils/convert-xlsx'
import { uploadTableAction } from '@/actions/tables/upload-table-action'
import { CompetenceSelect } from '../competence-select'

export function XlsxImporter() {
  const [files, setFiles] = useState<File[]>([])
  const [competence, setCompetence] = useState(new Date())

  const [{ errors }, handleSubmit, isPending] = useFormState(
    async (data) => {
      const arrayBuffer = await files[0].arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const table = convertXlsx(buffer)
      const stringTable = JSON.stringify(table)

      data.append('file', stringTable)
      data.append('competence', competence.toISOString())
      return uploadTableAction(data)
    },
    () => {
      toast.success('Tabela cadastrada com sucesso.')
    },
    (errMessage) => {
      toast.error(errMessage)
    },
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2">
          <CircleFadingPlus className="mr-2 size-4" />
          Importar tabela
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Adicionar nova tabela</DialogTitle>
          <DialogDescription>
            Arraste seus arquivos até aqui ou clique para buscar.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Modelo da tabela</Label>
            <Input type="text" name="name" id="name" />
            {errors?.name && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.name[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="mr-4">Competência</Label>
            <CompetenceSelect onDateSelect={setCompetence} />
            {errors?.competence && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400">
                {errors.competence[0]}
              </p>
            )}
          </div>
          <div>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              disabled={isPending}
            />
            {errors?.files && (
              <p className="text-xs font-medium text-red-500 dark:text-red-400 mt-2">
                {errors.files[0]}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="mt-2"
              disabled={files.length < 1 || isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Enviar'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
