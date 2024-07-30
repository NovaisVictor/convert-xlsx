'use client'
import { useUploadFile } from '@/hooks/use-upload-file'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { FileUploader } from './file-uploader'
import { CircleFadingPlus } from 'lucide-react'
import { Button } from '../ui/button'
export function XlsxImporter() {
  const { onUpload, isUploading } = useUploadFile('xlsxUploader')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} className="p-2">
          <CircleFadingPlus className="mr-2 size-4" />
          Import XLSX
        </Button>
      </DialogTrigger>
      <DialogContent className="p-8 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload XLSX</DialogTitle>
          <DialogDescription>
            Drag and drop your files here or click to browse.
          </DialogDescription>
        </DialogHeader>
        <FileUploader
          accept={{
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
              [],
          }}
          multiple={false}
          maxSize={1024 * 1024 * 5}
          maxFileCount={1}
          onUpload={async (files) => {
            const file = files[0]
            if (!file) return
            await onUpload(files)
          }}
          disabled={isUploading}
        />
      </DialogContent>
    </Dialog>
  )
}
