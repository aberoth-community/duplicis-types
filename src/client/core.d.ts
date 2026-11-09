declare module '@duplicis/core' {
  import type { Duplicis } from '@duplicis/types'

  export const Plugin: Duplicis.PluginConstructor
  export const PluginI18n: Duplicis.PluginI18nConstructor
  export const FrameworkPlugin: Duplicis.FrameworkPluginConstructor

  export const GameConstants: import('../plugin-utils').GameConstants
  export const GameColors: import('../plugin-utils').GameColors

  /** Duplicis client */
  export const client: Duplicis.Client

  export type * from '@duplicis/types'

  export default client
}
