declare module '@duplicis/core' {
  import type { Duplicis } from '@duplicis/types'

  export const Client: Duplicis.ClientConstructor
  export const Plugin: Duplicis.PluginConstructor
  export const PluginI18n: Duplicis.PluginI18nConstructor
  export const FrameworkPlugin: Duplicis.FrameworkPluginConstructor

  /** Duplicis client */
  export const client: Duplicis.Client

  export type * from '@duplicis/types'

  export default client
}
