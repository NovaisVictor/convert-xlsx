import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  xlsxUploader: f({
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      maxFileSize: '8MB',
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    // This code RUNS ON YOUR SERVER after upload
    console.log('Upload complete for userId:')

    // console.log('file url', file.url)
    return { fileUrl: file.url }
  }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
