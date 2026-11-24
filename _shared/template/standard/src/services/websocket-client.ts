export type SocketState = 'idle' | 'connecting' | 'open' | 'closed'

export type WebSocketClientOptions = {
  url: string
  heartbeatMs?: number
  maxReconnectMs?: number
  WebSocketImpl?: typeof WebSocket
  onMessage?: (data: unknown) => void
  onState?: (state: SocketState) => void
}

export class ResilientWebSocket {
  readonly #url: string
  readonly #heartbeatMs: number
  readonly #maxReconnectMs: number
  readonly #WebSocket: typeof WebSocket
  readonly #onMessage?: WebSocketClientOptions['onMessage']
  readonly #onState?: WebSocketClientOptions['onState']
  #socket: WebSocket | undefined
  #heartbeat: ReturnType<typeof setInterval> | undefined
  #reconnect: ReturnType<typeof setTimeout> | undefined
  #attempt = 0
  #stopped = true

  constructor(options: WebSocketClientOptions) {
    this.#url = new URL(options.url).toString()
    this.#heartbeatMs = options.heartbeatMs ?? 20_000
    this.#maxReconnectMs = options.maxReconnectMs ?? 30_000
    this.#WebSocket = options.WebSocketImpl ?? WebSocket
    this.#onMessage = options.onMessage
    this.#onState = options.onState
  }

  connect() {
    if (!this.#stopped) return
    this.#stopped = false
    this.#open()
  }

  disconnect() {
    this.#stopped = true
    clearInterval(this.#heartbeat)
    clearTimeout(this.#reconnect)
    this.#socket?.close()
    this.#socket = undefined
    this.#onState?.('closed')
  }

  send(value: unknown) {
    if (this.#socket?.readyState !== this.#WebSocket.OPEN) throw new Error('WebSocket is not open')
    this.#socket.send(JSON.stringify(value))
  }

  #open() {
    if (this.#stopped) return
    this.#onState?.('connecting')
    const socket = new this.#WebSocket(this.#url)
    this.#socket = socket
    socket.addEventListener('open', () => {
      this.#attempt = 0
      this.#onState?.('open')
      clearInterval(this.#heartbeat)
      this.#heartbeat = setInterval(() => {
        if (socket.readyState === this.#WebSocket.OPEN) socket.send(JSON.stringify({ type: 'keepalive' }))
      }, this.#heartbeatMs)
    })
    socket.addEventListener('message', (event) => {
      try { this.#onMessage?.(JSON.parse(String(event.data))) }
      catch { this.#onMessage?.(event.data) }
    })
    socket.addEventListener('close', () => {
      clearInterval(this.#heartbeat)
      if (this.#socket === socket) this.#socket = undefined
      if (this.#stopped) return
      const delay = Math.min(1000 * 2 ** this.#attempt++, this.#maxReconnectMs)
      this.#reconnect = setTimeout(() => this.#open(), delay)
    })
  }
}
