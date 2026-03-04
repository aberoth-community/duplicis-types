import type Aberoth from '../aberoth'

declare global {
  interface Window {
    readonly App: Aberoth.AppConstructor
    readonly ES: Aberoth.GameConstructor
    app?: Aberoth.App
    autoLoad?: Aberoth.AutoLoad
  }

  const App: Aberoth.AppConstructor
  const ES: Aberoth.GameConstructor
  const Connection: Aberoth.ConnectionConstructor
  let app: Aberoth.App | undefined
  let autoLoad: Aberoth.AutoLoad | undefined
}
