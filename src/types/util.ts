import {CONSTANT} from '@'

/**
 * オブジェクトの値の型
 */
export type ValueOf<T> = T[keyof T]

/**
 * よくあるObjectの型
 */
export type Dictionary<K extends string | number, V = any> = {[_K in K]?: V}

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
 * ポート番号
 * - 0 ~ 65535 のInteger
 */
export type Port = number

/**
 * プロセスID
 */
export type Pid = number

/**
 * HTTP関連の型
 */
export namespace Http {
  // HTTPメソッドの型
  export type Method = ValueOf<typeof CONSTANT.UTIL.HTTP_METHOD>

  /**
   * メソッドとパスの区切り文字
   */
  export type MethodPathDelimiter = typeof CONSTANT.UTIL.HTTP_METHOD_PATH_DELIMITER

  /**
   * HTTPのパス
   */
  export type PathDelimiter = typeof CONSTANT.UTIL.HTTP_PATH_DELIMITER

  /**
   * HTTP Routerに渡すオブジェクトのキーの型
   * @example 'GET:/api/workout/menus'
   */
  export type RouterKey = `${Method}${MethodPathDelimiter}${PathDelimiter}${string}`
}
