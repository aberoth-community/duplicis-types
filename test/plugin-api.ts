import '@duplicis/types/client'
import client, { Plugin, GameConstants, GameColors } from '@duplicis/core'
import { registerCommand } from '@duplicis/plugin-chat-system'
import type { PluginUtilsScope, TextEvent, Duplicis } from '@duplicis/types'

class PublicPlugin extends Plugin {
  static override name = 'public-api-check'

  override onLoad() {
    const owner: Duplicis.Plugin = this
    const scope: PluginUtilsScope = client.pluginUtils.forPlugin(owner)
    scope.text.observe((event: TextEvent) => {
      if (event.source === 'native' && event.color === GameColors.PlayerDamage)
        scope.report('Observed native damage')
    })
    scope.own(
      registerCommand({
        id: 'public-check',
        owner: this.name,
        name: 'public check',
        pattern: /^public check$/,
        execute: () => {
          scope.input.sendSpecialAction(GameConstants.SpecialAction.BeginFighting)
        },
      }),
    )

    // @ts-expect-error Native bridge attachment is internal to the client.
    client.pluginUtils.attach
    // @ts-expect-error Database implementation is internal to the client.
    client.db
    // @ts-expect-error Plugin wrapper implementation is internal to the client.
    client.loader
    // @ts-expect-error Native bridge processing is internal to the client.
    client.pluginUtils.processText
  }
}

export default PublicPlugin
