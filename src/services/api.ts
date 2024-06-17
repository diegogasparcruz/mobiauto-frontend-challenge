const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_FIPE_API!
const API_KEY = process.env.NEXT_PUBLIC_FIPE_API_KEY!

export const api = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const data = await fetch(`${BASE_URL}${input}`, {
    ...init,
    headers: {
      ...init?.headers,
      'X-Subscription-Token': API_KEY,
    },
  })

  const results = await data.json()

  return results as T
}
