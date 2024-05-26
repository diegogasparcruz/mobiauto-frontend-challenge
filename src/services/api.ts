const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_FIPE_API!

export const api = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
) => {
  const data = await fetch(`${BASE_URL}${input}`, init)

  const results = await data.json()

  return results as T
}
