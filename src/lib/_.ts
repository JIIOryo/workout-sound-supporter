import * as lodash from 'lodash'
import * as uuid from 'uuid'

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

/**
 * each
 *
 * - objectのvalueとkeyを順番に処理する
 * - `_.each`のラッパー
 *   - `_.each`のobjectを入れた時の型がついているもの
 *   - `_.each`はいろいろ入れられそうだけど、`_.each`のラッパーとして使うわけではないので、現在はobjectのみ対応
 *
 * @template V - objectのvalueの型
 * @template K - objectのkeyの型
 * @param {{[_K in K]?: V}} obj object
 * @param {(v: V, k: K) => void} callback - コールバック
 * @returns {{[_K in K]?: V}}
 */
export function each<V, K extends string>(obj: { [_K in K]?: V }, callback: (v: V, k: K) => void): { [_K in K]?: V } {
  // @ts-expect-error TS-2769
  return lodash.each(obj, callback)
}

/**
 * uuidを生成する
 * @returns uuid
 */
export function generateUuid(): string {
  return uuid.v4().replace(/-/g, '')
}
