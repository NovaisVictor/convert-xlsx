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
import { Label } from '../ui/label'

import { useState } from 'react'
import { CompetenceSelect } from '../competence-select'
import { useServerAction } from 'zsa-react'
import { convertXlsx } from '@/utils/convert-xlsx'
import { getFileHash } from '@/utils/get-file-hash'
import { toast } from 'sonner'
import { uploadTableAction } from '@/actions/tables/upload-table-action'
import { queryClient } from '@/lib/react-query'
import { QueryKeyFactory } from '@/hooks/server-action-hooks'

export function XlsxImporter() {
  const [files, setFiles] = useState<File[]>([])

  const [competence, setCompetence] = useState(new Date())

  const { isPending, execute } = useServerAction(uploadTableAction)

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
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="mr-4">Competência</Label>
            <CompetenceSelect onDateSelect={setCompetence} />
          </div>
          <div>
            <FileUploader
              value={files}
              onValueChange={setFiles}
              disabled={isPending}
            />
          </div>
          <div>
            <Button
              onClick={async () => {
                const file = files[0]

                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                const hash = await getFileHash(file)
                const arrayTable = await convertXlsx(buffer)

                toast.promise(
                  execute({
                    name: file.name,
                    competence,
                    hash,
                    arrayTable,
                  }).then((data) => {
                    if (data[1]?.code === 'ERROR') {
                      return Promise.reject(new Error(data[1].message))
                    }
                    return data
                  }),
                  {
                    loading: 'Convertendo...',
                    success(data) {
                      console.log(data[1])
                      if (data[1]?.code === 'ERROR') {
                        // Rejeita a promessa se houver um erro
                        return Promise.reject(new Error(data[1].message))
                      }
                      queryClient.refetchQueries({
                        queryKey: QueryKeyFactory.getCompanyTablesAction(), // return the same query key as defined in our factory
                      })
                      return 'Tabela cadastrada com sucesso'
                    },
                    error(err) {
                      return `Error: ${err.message}`
                    },
                  },
                )
              }}
              className="mt-2"
              disabled={!competence || isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                'Enviar'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
