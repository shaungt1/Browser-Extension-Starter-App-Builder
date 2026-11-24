export type ApiClientOptions = {
  baseUrl: string
  getAccessToken?: () => Promise<string | undefined>
  fetchImpl?: typeof fetch
}

export class ApiClient {
  readonly #baseUrl: URL
  readonly #getAccessToken?: ApiClientOptions['getAccessToken']
  readonly #fetch: typeof fetch

  constructor({ baseUrl, getAccessToken, fetchImpl = fetch }: ApiClientOptions) {
    this.#baseUrl = new URL(baseUrl)
    this.#getAccessToken = getAccessToken
    this.#fetch = fetchImpl
  }

  async request<T>(pathname: string, init: RequestInit = {}): Promise<T> {
    const token = await this.#getAccessToken?.()
    const headers = new Headers(init.headers)
    headers.set('accept', 'application/json')
    if (init.body && !headers.has('content-type')) headers.set('content-type', 'application/json')
    if (token) headers.set('authorization', `Bearer ${token}`)

    const response = await this.#fetch(new URL(pathname, this.#baseUrl), { ...init, headers })
    if (!response.ok) throw new Error(`API request failed (${response.status})`)
    return response.json() as Promise<T>
  }
}
