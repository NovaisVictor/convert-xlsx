import * as React from 'react'
import type { UploadedFile } from '@/types'
import { toast } from 'sonner'
import type { UploadFilesOptions } from 'uploadthing/types'

import { getErrorMessage } from '@/utils/handle-error'
import { uploadFiles } from '@/utils/uploadthing'
import { type OurFileRouter } from '@/app/api/uploadthing/core'
import { SetCookieUrlAction } from '@/components/actions'

interface UseUploadFileProps
  extends Pick<
    UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
    'headers' | 'onUploadBegin' | 'onUploadProgress' | 'skipPolling'
  > {
  defaultUploadedFiles?: UploadedFile[]
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {},
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<UploadedFile[]>(defaultUploadedFiles)
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)
  // const [uploadedFileUrl, setUploadedFileUrl] = React.useState<string>('')
  async function onUpload(files: File[]) {
    setIsUploading(true)
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file]: progress ?? 0,
            }
          })
        },
      })
      const fileUrl = res[0].url // Obter a URL do primeiro arquivo
      SetCookieUrlAction(fileUrl)
      setUploadedFiles((prev) => (prev ? [...prev, ...res] : res))
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    onUpload,
    uploadedFiles,
    progresses,
    isUploading,
  }
}
