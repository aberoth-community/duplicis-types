declare module '@duplicis/plugin-auth' {
  import { Duplicis } from '@duplicis/types'
  export const AuthPlugin: Duplicis.PluginConstructor
  export default AuthPlugin
}

declare module '@duplicis/plugin-settings' {
  import { Duplicis, type Aberoth } from '@duplicis/types'
  export const AppMixin: Duplicis.Target<Aberoth.AppConstructor>
  export const GameMixin: Duplicis.Target<Aberoth.GameConstructor>
  export const ConnectionMixin: Duplicis.Target<Aberoth.ConnectionConstructor>
  export const SettingPlugin: Duplicis.PluginConstructor
  export default SettingPlugin
}

declare module '@duplicis/plugin-chat-system' {
  import type { Duplicis, ChatCommand, ChatSystemApi, Disposer } from '@duplicis/types'
  export const ChatSystemPlugin: Duplicis.PluginConstructor
  export const AppMixin: Duplicis.Target<import('@duplicis/types').Aberoth.AppConstructor>
  export const MAX_SPEECH_LENGTH: 229
  export const INDICATOR_THRESHOLD: 6
  /** Available after chat onLoad(); undefined before initialization and after teardown. */
  export function getChatSystem(): ChatSystemApi | undefined
  /** Register during the owner's onLoad(). Returns a disposer; owner exit also unregisters it. */
  export function registerCommand(command: ChatCommand): Disposer
  export type {
    ChatCommand,
    ChatSystemApi,
    ChatSnapshot,
    SendResult,
    HintOptions,
  } from '@duplicis/types'
  export default ChatSystemPlugin
}

declare module '@duplicis/plugin-chat-window' {
  import type { Duplicis } from '@duplicis/types'
  export const ChatWindowPlugin: Duplicis.PluginConstructor
  export default ChatWindowPlugin
}
