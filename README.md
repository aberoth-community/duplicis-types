# @duplicis/types

<p align="center">
  <img alt="Duplicis logo" src="https://duplicis.app/logo.svg" width="33%" />
</p>
<p align="center">Duplicis client types.</p>

## About

### Installation

```bash
npm i -D @duplicis/types
```

## External plugins

Add `import '@duplicis/types/client'` to a declaration file included by your TypeScript project.
It declares the modules supplied by the running client; you do not install or bundle private
`@duplicis/core` source. Import runtime values from `@duplicis/core` and types from this package:

```ts
import { Plugin, client, GameConstants } from '@duplicis/core'
import type { TextEvent } from '@duplicis/types'

export default class Example extends Plugin {
  static override name = 'example-plugin'

  override onLoad() {
    const utils = client.pluginUtils.forPlugin(this)
    utils.text.observe((event: TextEvent) => {
      if (event.source === 'native' && event.raw.id === GameConstants.TextId.Hint)
        utils.report('Observed a hint')
    })
  }
}
```

The client also supplies `GameColors`, `PluginI18n`, and `FrameworkPlugin`. Public utility types
are exported from the package root and `@duplicis/types/plugin-utils`; chat contracts are
exported from the root and `@duplicis/types/chat-system`. The client declaration entrypoint
includes the `@duplicis/plugin-chat-system` command API. Chat is a host-provided module, not an
npm dependency of an external bundle.

Keep these runtime imports external in your build. The host import map supplies the core root
and installed plugin modules, not arbitrary core subpaths such as `@duplicis/core/i18n`.

## Utility lifetime

Each plugin instance gets one cached utility scope. The client disposes observers and owned
cleanup on plugin exit, including failed exits. Use `scope.own(cleanup)` for timers or other
resources. Observe `scope.session` to discard state when sessions change. Do not wait for game
readiness in `onLoad()`: initial game construction happens after plugins finish loading.

Text, input, and mouse operations return readiness or compatibility results. They do not queue
actions into later sessions. Read `scope.text.getSnapshot()` for current world text and use
`scope.text.observe()` for updates. Ignore local text when implementing native event consumers.
Name/color helpers describe displayed text conventions, not authoritative server entities.

Utilities are available through `client.pluginUtils`; consumers do not import the internal
`@duplicis/plugin-utils` bridge. The client owns native attachment, drawing hooks, and cleanup.
Those internal adapter methods, database access, and loader wrappers are absent from these types.

When developing against an unreleased public API, use a matching local checkout of this public
types repository. A released external plugin must document the compatible client/API revision.
