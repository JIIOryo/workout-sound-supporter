
/**
 * オブジェクトの値の型
 */
export type ValueOf<T> = T[keyof T]

/**
 * 数値関連の型
 */
export namespace Number {
  /**
   * タイムスタンプ(ms)
   */
  export type Timestamp = number
  /**
   * 秒
   */
  export type Seconds = number
}

/**
 * よくあるObjectの型
 */
export type Dictionary<K extends string | number, V = any> = {[_K in K]?: V}
