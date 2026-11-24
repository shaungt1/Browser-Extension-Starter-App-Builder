import { ApiClient } from './api-client'

export type AiRequest = { prompt: string; conversationId?: string }
export type AiResponse = { text: string; conversationId: string }

export class AiClient {
  constructor(private readonly api: ApiClient) {}

  generate(request: AiRequest) {
    return this.api.request<AiResponse>('/v1/ai/generate', {
      method: 'POST',
      body: JSON.stringify(request)
    })
  }
}
