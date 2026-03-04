import type Emitter from 'component-emitter'
import type { Snippet } from 'svelte'
import type { Aberoth } from './aberoth'
import type { PackageJSON } from './package-json'
import type { Awaitable, TypedTranslationFunctions } from './unit'
import type { Options as ToastMessage } from '@zag-js/toast'
import type { BaseTranslation, Locales, TranslationFunctions } from '@duplicis/i18n'

export namespace Duplicis {
  /**
   * configuration binding options
   * @example
   * this.config<Type>(key: string, type: Type, value: Bind.Map[Type])
   */
  export namespace Bind {
    /** Binding translation. */
    export interface BindTranslations extends BaseTranslation {
      display_name: string
      description: string
    }

    /** Binding i18n translations. */
    export type i18n = Partial<Record<Locales, BindTranslations>>

    /** Binding options base. */
    export interface Base {
      default?: unknown
      i18n?: i18n
    }

    /** Boolean options. */
    export interface Bool extends Base {
      default?: boolean
      i18n?: i18n
    }

    /** Hotkey options. */
    export interface Hotkey extends Base {
      default?: string
      i18n?: i18n
    }

    /** Integer options. */
    export interface Int extends Base {
      default?: number
      i18n?: i18n
      max?: number
      min?: number
    }

    /** Range slider options. */
    export interface Range extends Base {
      default?: number
      i18n?: i18n
      max?: number
      min?: number
      step?: number
    }

    /** Text options. */
    export interface Text extends Base {
      default?: string
      i18n?: i18n
      max?: number
      min?: number
      placeholder?: string
    }

    /** Select options. */
    export interface Select extends Base {
      default?: number
      values?: string[]
    }

    /** option type names */
    export type Type = keyof Map

    /**
     * options map by name
     *
     * @example
     * Duplicis.Bind.Map[Type]
     */
    export interface Map {
      bool: Bool
      hotkey: Hotkey
      int: Int
      range: Range
      select: Select
      text: Text
    }

    /**
     * option value by name
     *
     * @example
     * Duplicis.Bind.Value[Type]
     */
    export interface Value {
      bool: boolean
      hotkey: string
      int: number
      number: number
      range: number
      select: string
      text: string
    }
  }

  /** Sidebar menu manager. */
  export interface ClientSidebar {
    close(): void
    open(plugin?: PluginConstructor): string | undefined
    opened(): string | undefined
    toast(msg: ToastMessage): string
    toastOnce(id: string, msg: ToastMessage): string
    toastDismiss(id?: string): void
    toastUpdate(id: string, msg: Partial<ToastMessage>): string
    toastVisible(id?: string): boolean
  }

  export interface ClientConstructor {
    readonly instance: Client
    readonly prototype: ClientPrototype
    new (): Client
  }

  export interface ClientPrototype {
    readonly constructor: unknown
  }

  /** Duplicis client singleton. */
  export interface Client extends ClientPrototype {
    readonly canvas: HTMLCanvasElement
    readonly i18n: TranslationFunctions
    readonly app?: Aberoth.App
    readonly game?: Aberoth.Game
    readonly sidebar: ClientSidebar
    login(username?: string | null, password?: string | null, profile?: string | null): void
    logout(): void
    reload(
      username?: string | null,
      password?: string | null,
      profile?: string | null,
    ): Promise<void>
  }

  /** plugin configuration binding */
  export interface PluginBinding<Type extends Bind.Type> extends InstanceType<typeof Emitter> {
    /** config key */
    readonly key: string
    /** config options */
    readonly options: Bind.Map[Type]
    /** config type-name */
    readonly type: Type
    /** Translation functions. */
    readonly t: TypedTranslationFunctions<Bind.BindTranslations>

    /**
     * get value
     * @returns bind value
     */
    get(): Promise<Bind.Value[Type]>
    /**
     * set value
     * @param value bind value
     * @returns bind value
     */
    set(value: Bind.Value[Type]): Promise<Bind.Value[Type]>
    /**
     * update value
     * @param callback - updater callback
     * @returns bind value
     */
    update(
      callback: (value: Bind.Value[Type]) => Awaitable<Bind.Value[Type]>,
    ): Promise<Bind.Value[Type]>
  }

  /** Plugin localizer contructor. */
  export interface PluginI18nConstructor {
    prototype: PluginI18nPrototype
    new <T>(): PluginI18n<T>
  }

  /** Plugin localizer prototype. */
  export interface PluginI18nPrototype {}

  /** Base translation keys for plugins. */
  export type BasePluginTranslation = BaseTranslation & {
    /** Plugin display name. */
    display_name: string
    /** Plugin description. */
    description: string
  }

  /** Plugin localizer. */
  export interface PluginI18n<out T = BasePluginTranslation> {
    /** Translation methods. */
    readonly t: TypedTranslationFunctions<T>
  }

  /** Plugin constructor. */
  export interface PluginConstructor {
    readonly prototype: PluginPrototype
    /** Plugin sidebar icon. */
    readonly icon: PluginComponent
    /** Plugin sidebar menu. */
    readonly menu: PluginComponent
    /** Plugin name. */
    readonly name: string
    /** Logo image. */
    readonly logo?: string
    /** Logo image. */
    readonly thumb?: string
    /** Plugin instance. */
    instance: Plugin

    /** Plugin constructor */
    new (): Plugin

    /**
     * Create framework component.
     * @param component JSX Component.
     * @param props     JSX Component props.
     * @returns         Duplicis plugin component.
     */
    component<ComponentType>(
      component: ComponentType,
      framework: FrameworkPluginConstructor,
      props?: Record<string, unknown>,
    ): PluginComponent<ComponentType>

    /**
     * Apply mixin patch.
     * @param name   Target name.
     * @param base   Base class.
     * @param apply  Mixin function.
     * @returns Modified target.
     */
    patch<
      Name extends TargetName,
      Base extends TargetList[Name]['constructor'],
      Mixin extends TargetList[Name]['constructor'],
    >(
      name: Name,
      base: Base,
      apply: TargetApply<Base, Mixin>,
    ): Target<Mixin>

    /**
     * Generate plugin translations.
     * @param data Translation data.
     * @returns Plugin translator.
     */
    translations<T extends BasePluginTranslation>(data: Record<Locales, T>): PluginI18n<T>
  }

  /** Plugin prototype. */
  export interface PluginPrototype {
    /**
     * create config binding
     * @param key     - config key
     * @param type    - config type
     * @param options - binding options
     * @returns binding instance
     */
    config<Type extends Bind.Type>(
      key: string,
      type: Type,
      options?: Bind.Map[Type],
    ): PluginBinding<Type>
  }

  /** Plugin framework component. */
  export interface PluginComponent<Component = any> {
    component: Component
    props?: Record<string, unknown>
    framework?: { instance: FrameworkPlugin<any> }
  }

  /**
   * Plugin.
   * @class
   */
  export interface Plugin extends PluginPrototype {
    readonly name: string
    readonly manifest: PackageJSON
    onLoad(): Awaitable<void>
    onExit(): Awaitable<void>
  }

  /** Framework provider plugin prototype. */
  export interface FrameworkPluginPrototype {}

  /** Framework provider plugin constructor. */
  export interface FrameworkPluginConstructor extends PluginConstructor {
    readonly name: string
    instance: FrameworkPlugin<any>
    new <ComponentType>(): FrameworkPlugin<ComponentType>

    /**
     * Create framework component.
     * @param component Framework component.
     * @param props     Component props.
     * @returns         Duplicis plugin component.
     */
    component(component: unknown, props?: Record<string, unknown>): PluginComponent
  }

  /**
   * Framework prover plugin.
   * @class
   */
  export interface FrameworkPlugin<ComponentType>
    extends FrameworkPluginPrototype, Omit<Plugin, 'constructor'> {
    wrap(component: ComponentType): Snippet<[any]>
    onLoad(): Awaitable<void>
    onExit(): Awaitable<void>
  }

  export interface Target<T extends abstract new (...args: any) => any> {
    readonly key: string
    constructor: T
    instance?: InstanceType<T>
  }

  export interface TargetList {
    app: Target<Aberoth.AppConstructor>
    game: Target<Aberoth.GameConstructor>
  }

  export type TargetName = keyof TargetList

  export type TargetApply<Base, Mixin> = (constructor: Base) => Mixin
}

export default Duplicis
