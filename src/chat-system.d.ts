import type { Disposer, UtilityResult } from './plugin-utils'

export interface ChatCommand {
  /** Unique within this owner's registrations. Register during the owning plugin's onLoad(). */
  id: string
  /** Loaded plugin name. Its utility scope owns the registration and removes it on exit. */
  owner: string
  name: string
  /** Matched against original-case speech. Each registration uses an isolated RegExp. */
  pattern: RegExp
  /** Include this command in the built-in custom-command listing. */
  listed?: boolean
  /** Also send matched speech to the server after successful execution. Default: false. */
  forwardToServer?: boolean
  /** Runs synchronously; promises are unsupported. A failure prevents forwarding. */
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
  /** Retain this hint through subsequent native hint clears. Default: false. */
  preserve?: boolean
  /** Send Escape and wait for the native menu clear before displaying. Default: false. */
  dismissServerMenu?: boolean
  /** Fallback delay when waiting for the native clear, in milliseconds. Default: 1000. */
  timeoutMs?: number
}

/** Public compositor API. Obtain the current instance with getChatSystem() on each use. */
export interface ChatSystemApi {
  /** Validate speech, dispatch local commands, then send if unconsumed. Failures retain the draft. */
  send(text: string): SendResult
  /** Clear local composition and dismiss native menus by sending Escape. */
  cancel(): void
  /** Display a local notification without replacing a composed draft or server input prompt. */
  notify(text: string): UtilityResult
  /** Replace the current hint. Own the returned disposer with the calling plugin's utility scope. */
  showHint(text: string, options?: HintOptions): Disposer
  /** Suppress notifications until disposed, or suppress one notification when once is true. */
  suppressNotifications(options?: { once?: boolean }): Disposer
  /** Retain the current notification through native clears. Pass false to stop preserving. */
  preserveNotification(enabled?: boolean): void
  /** Immutable snapshot; reacquire it to read later state. Server prompts remain server-owned. */
  getSnapshot(): ChatSnapshot
}
