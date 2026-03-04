/** Potentially promise wrapped value. */
export type Awaitable<T> = Promise<T> | T

/** Generic color string */
export type Color = ColorHex | ColorRgb | ColorRgba

export type ColorHex = `#${number}`
export type ColorRgb = `RGB(${number}, ${number}, ${number})`
export type ColorRgba = `RGBA(${number}, ${number}, ${number}, ${number})`

/** 2D box size & vector */
export interface Box extends Vec2 {
  width: number
  height: number
}

/** Aberoth scale */
export interface Scale {
  down: number
  up: number
}

/** 2D Vector */
export interface Vec2 {
  x: number
  y: number
}
