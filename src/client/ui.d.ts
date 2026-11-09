declare module '@duplicis/ui/popout' {
  import type { Action } from 'svelte/action'

  export interface PopoutOptions {
    open: boolean
    ignore?: string[]
  }

  export interface PopoutDismissDetail {
    reason: 'outside' | 'escape'
    element?: HTMLElement
  }

  export const popout: Action<
    HTMLElement,
    PopoutOptions,
    { onpopoutdismiss?: (event: CustomEvent<PopoutDismissDetail>) => void }
  >
}
