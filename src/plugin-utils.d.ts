import type Duplicis from './duplicis'
import type { ColorHex, Scale, Vec2 } from './unit'

export type Disposer = () => void
export type UtilityResult =
  { status: 'ok' } | { status: 'not-ready' | 'unsupported-client' | 'invalid-argument' | 'failed' }
export type TextIntent = 'notification' | 'hint' | 'raw'

/** Shared, runtime game constants (available from @duplicis/core). */
export interface GameConstants {
  readonly TextCommand: { readonly New: 8; readonly Move: 9 }
  readonly TextId: {
    readonly ClearAll: 0
    readonly BottomMessage: 2
    readonly Hint: 3
    readonly TopMessage: 4
    readonly Notification: 65001
  }
  readonly TextPosition: { readonly CenterY: 65535 }
  readonly SubwindowId: {
    readonly MainCanvas: 0
    readonly RealmIcon: 3
    readonly FirstItem: 10
    readonly FirstInventory: 19
    readonly Accessories: readonly [34, 35, 36, 37, 38, 39]
  }
  readonly KeyAction: {
    readonly Pressed: 0
    readonly Released: 1
    readonly Typed: 2
    readonly Special: 11
    readonly BufferSpeech: 12
    readonly DropEquipped: 13
  }
  readonly SpecialAction: {
    readonly BeginFighting: 1
    readonly EndFighting: 2
    readonly AboutToSpeak: 5
    readonly SpeakBuffer: 6
  }
  readonly KeyCode: {
    readonly Backspace: 8
    readonly Enter: 13
    readonly Control: 17
    readonly Escape: 27
  }
  readonly MouseButton: { readonly Left: 1; readonly Right: 3 }
  readonly MouseAction: { readonly Pressed: 0; readonly Released: 1 }
}

export interface GameColors {
  readonly FriendlyName: ColorHex
  readonly HarmonyName: ColorHex
  readonly UnfriendlyName: ColorHex
  readonly PlayerDamage: ColorHex
  readonly MobDamage: ColorHex
  readonly MobDeath: ColorHex
  readonly Health: ColorHex
  readonly MissingHealth: ColorHex
  readonly ThirstyHealth: ColorHex
  readonly DiseasedHealth: ColorHex
  readonly Poison: ColorHex
  readonly Ember: ColorHex
  readonly Drain: ColorHex
}

export interface UtilitySession {
  readonly id: number
  readonly inputReady: boolean
  readonly textReady: boolean
  readonly playerName: string
  readonly scale: Readonly<Scale>
}

export interface TextCommand extends Vec2 {
  id: number
  type: number
  text: string | null
  offset: number
  font: number | null
  specialY: boolean
}

export interface TextEvent {
  /** Existing native slot content, provided transiently for preservation transforms. */
  readonly previousText?: string
  readonly source: 'native' | 'local'
  readonly intent: TextIntent
  readonly sessionId: number
  readonly windowId: number
  readonly color: string | undefined
  readonly raw: Readonly<TextCommand>
  readonly command: Readonly<TextCommand>
}

export interface TextDisplayOptions extends Partial<Vec2> {
  id: number
  text: string
  type?: number
  windowId?: number
  offset?: number
  font?: number
  specialY?: boolean
  intent?: TextIntent
  /** Skip a specific compositor while still notifying other consumers. */
  skip?: symbol
}

export interface RenderedText extends Readonly<TextCommand> {
  readonly sessionId: number
  readonly windowId: number
  readonly color: string | undefined
}

export interface UtilityText {
  observe(callback: (event: TextEvent) => void, stage?: 'raw' | 'rendered'): Disposer
  transform(
    callback: (event: TextEvent) => TextCommand | void,
    options?: { priority?: number; token?: symbol },
  ): Disposer
  display(options: TextDisplayOptions): UtilityResult & { dispose?: Disposer }
  clear(id: number, windowId?: number): UtilityResult
  /** Current non-UI text, not a message history. */
  getSnapshot(windowId?: number): readonly RenderedText[]
  isReservedTextId(id: number): boolean
}

export interface UtilityNames {
  /** Known NPC/mob label, matched case-insensitively. False does not prove a name is a player. */
  isNpcName(name: string): boolean
  isNameColor(color: unknown): boolean
  isSpecificName(text: string, color: unknown, name: string): boolean
  findPlayerText(): RenderedText | undefined
  findAuthor(origin: Vec2 & { offset: number; windowId?: number }): string | undefined
}

export interface ItemGridAnchors {
  readonly accessoriesTopRight: Readonly<Vec2>
  readonly inventoryBottomRight: Readonly<Vec2>
}

export interface UtilityHelpers {
  /** Fixed group anchors in canvas pixels; scale is game scale, not item scale. Invalid geometry throws RangeError. */
  itemGridAnchors(width: number, height: number, scale: number): ItemGridAnchors
  /** Hex (#rgb/#rgba/#rrggbb/#rrggbbaa), comma-separated rgb()/rgba(), or white. Invalid input returns undefined. */
  toRgba(color: unknown): string | undefined
  /** Single ASCII letter/digit, Space, or Escape. Modifiers and other names return undefined. */
  keyCode(key: unknown): number | undefined
  isItemWindow(id: number): boolean
  isAccessoryWindow(id: number): boolean
  isEditableTarget(event: Event, activeElement?: Element | null): boolean
  countLines(text: string): number
  wrapText(text: string, maxLineLength?: number): { text: string; lineCount: number }
}

export interface UtilityInput {
  sendKey(
    code: number,
    action: GameConstants['KeyAction'][keyof GameConstants['KeyAction']],
  ): UtilityResult
  sendSpecialAction(
    action: GameConstants['SpecialAction'][keyof GameConstants['SpecialAction']],
  ): UtilityResult
  pressAndRelease(code: number): UtilityResult
  /** Low-level native transport; bypasses chat commands. No automatic retries. */
  sendBufferedText(text: string): UtilityResult
}

export interface UtilityMouse {
  /** Coordinates are protocol pixels relative to this subwindow, not CSS pixels. */
  send(
    options: Vec2 & {
      windowId: number
      button: GameConstants['MouseButton'][keyof GameConstants['MouseButton']]
      action: GameConstants['MouseAction'][keyof GameConstants['MouseAction']]
    },
  ): UtilityResult
}

export interface PluginUtilsScope {
  readonly owner: string
  readonly profileId: number | undefined
  readonly active: boolean
  readonly constants: GameConstants
  readonly colors: GameColors
  readonly helpers: UtilityHelpers
  readonly names: UtilityNames
  readonly input: UtilityInput
  readonly mouse: UtilityMouse
  readonly text: UtilityText
  readonly session: {
    getSnapshot(): UtilitySession
    observe(callback: (session: UtilitySession) => void): Disposer
  }
  /** Register plugin-owned cleanup (also runs when onExit throws). */
  own(cleanup: Disposer): Disposer
  /** Report metadata only; never pass messages, drafts, or credentials. */
  report(message: string): void
  dispose(): void
}

export interface PluginUtils {
  readonly constants: GameConstants
  readonly colors: GameColors
  readonly helpers: UtilityHelpers
  readonly names: UtilityNames
  readonly session: { getSnapshot(): UtilitySession }
  forPlugin(plugin: Duplicis.Plugin): PluginUtilsScope
}
