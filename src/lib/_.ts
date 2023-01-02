import * as lodash from 'lodash'

import {Util} from '@/types'

/**
 * 配列もしくはオブジェクトのvalueに値が含まれているか判定
 * @param dict 配列もしくはオブジェクト
 * @param value value
 * @returns 含まれている: true, 含まれていない: false
 */
export function includes<T>(dict: Util.Dictionary<string, T> | Util.Dictionary<number, T> | null | undefined, value: T): boolean {
  return lodash.includes(dict, value)
}
