import {System} from '@/types'
import {lib, CONSTANT} from '@'

const _ = lib._

/**
 * 文字列が実行環境を表すかどうか
 * @param str 文字列
 * @returns 実行環境を表すかどうか
 */
export const isEnv = (str?: string): str is System.Env => {
  if (!str) {
    return false
  }
  return _.includes(CONSTANT.SYSTEM.ENV, str)
}
