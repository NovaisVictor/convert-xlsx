'use client'
import { useUploadFile } from '@/hooks/use-upload-file'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { FileUploader } from './file-uploader'
export function XlsxImporter() {
  const { onUpload, isUploading } = useUploadFile('xlsxUploader')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Import XLSX</Button>
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
