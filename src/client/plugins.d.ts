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
