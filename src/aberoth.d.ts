/**
 * Aberoth typing stubs.
 *
 * You can provide your own typing using namespace merging.
 * @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html#merging-namespaces
 * @example
 * declare module '@duplicis/types' {
 *   export namespace Aberoth {
 *     export interface App {
 *       example: boolean
 *     }
 *   }
 * }
 */
export namespace Aberoth {
  /**
   * Aberoth autoload configuration
   * @alias autoLoad
   */
  export interface AutoLoad {
    /** Username */
    username: string
    /** Password */
    password: string
    /** Scale up */
    scaleup: number
    /** Scale down */
    scaledown: number
    /** Font size */
    fontsize: number
    /** Game ip address */
    ipaddress: string
    /** Enable widescreen */
    screendefinition: number
    /** Enable password encryption */
    encryptpassword: number
    /** Reload page on death */
    reloadOnDeath?: boolean
  }

  /** App prototype */
  export interface AppPrototype {
    constructor: AppConstructor

    /** start new game */
    newGame(): void
  }

  /** App constructor */
  export interface AppConstructor {
    prototype: AppPrototype
    new (): App
  }

  /**
   * App instance
   * @class
   */
  export interface App extends AppPrototype {
    /** Auto load configuration */
    autoLoad: AutoLoad

    /** Game canvas */
    canvas: HTMLCanvasElement

    /** Game instance */
    game: Game
  }

  /** Connection constructor. */
  export interface ConnectionConstructor {
    prototype: ConnectionPrototype
    new (): Connection
  }

  /** Connection prototype. */
  export interface ConnectionPrototype {}

  /**
   * Aberoth connection.
   * @class
   */
  export interface Connection extends ConnectionPrototype {}

  /** Game prototype */
  export interface GamePrototype {
    constructor: GameConstructor

    /**
     * Run game
     * @param username           aberoth username
     * @param password           aberoth password
     * @param scaleUp            up scale
     * @param scaleDown          down scale
     * @param fontSize           font size
     * @param ipAddress          aberoth server address
     * @param screenDefinition   widescreen enabled
     * @param encryptPassword    enable password encryption
     * @param reloadOnDeath      reload on death
     * @param javaVersion        java extension version
     */
    run(
      username: string,
      password: string,
      scaleUp: number,
      scaleDown: number,
      fontSize: number,
      ipAddress: string,
      screenDefinition: number,
      encryptPassword: number,
      reloadOnDeath: boolean,
      javaVersion: string,
    ): void
  }

  /** Game constructor */
  export interface GameConstructor {
    prototype: GamePrototype
    new (app: App): Game
  }

  /**
   * Game instance
   * @class
   */
  export interface Game extends GamePrototype {
    /** Game app */
    app: App
    /** Game rendering context */
    context: CanvasRenderingContext2D
    /** Champion name */
    playerName: string
    /** Player password */
    password: string
    /** Screen size x */
    sizeX: number
    /** Screen size y */
    sizeY: number
    /** Aberoth! */
    title: string
  }
}

export default Aberoth
