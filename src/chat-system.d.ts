import type { Disposer, UtilityResult } from './plugin-utils'

export interface ChatCommand {
  id: string
  owner: string
  name: string
  pattern: RegExp
  listed?: boolean
  forwardToServer?: boolean
  execute(context: { text: string; match: RegExpMatchArray }): void
}

export interface ChatSnapshot {
  readonly mode: 'idle' | 'composing' | 'serverPrompt'
  readonly draft: string
  readonly notification: string
  readonly hiding: boolean | undefined
}

export type SendResult =
  | { status: 'sent' | 'consumed' }
  | { status: 'invalid' | 'not-ready' | 'unsupported-client' | 'failed'; reason?: string }

export interface HintOptions {
  preserve?: boolean
  dismissServerMenu?: boolean
  timeoutMs?: number
}

export interface ChatSystemApi {
  send(text: string): SendResult
  cancel(): void
  notify(text: string): UtilityResult
  showHint(text: string, options?: HintOptions): Disposer
  suppressNotifications(options?: { once?: boolean }): Disposer
  preserveNotification(enabled?: boolean): void
  getSnapshot(): ChatSnapshot
}
