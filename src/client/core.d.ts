declare module '@duplicis/core' {
  import type { Duplicis, GameColors, GameConstants } from '@duplicis/types'

  export const Plugin: Duplicis.PluginConstructor
  export const PluginI18n: Duplicis.PluginI18nConstructor
  export const FrameworkPlugin: Duplicis.FrameworkPluginConstructor

  export const GameConstants: GameConstants
  export const GameColors: GameColors

  /** Duplicis client */
  export const client: Duplicis.Client

  export type * from '@duplicis/types'

  export default client
}
