'use server'

import { cookies } from 'next/headers'

export async function SetCookieUrlAction(url: string) {
  cookies().set('file-url', url)
  console.log(url)
}
