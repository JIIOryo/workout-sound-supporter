import moment from 'moment'

import {Util} from '@/types'

/**
 * タイムスタンプを指定の形式に変換する
 * @param timestamp - 時刻(ms)
 * @param format - 時刻のフォーマット
 * @returns 時刻の文字列
 */
export const format = (timestamp: Util.Number.Timestamp, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  return moment(timestamp).format(format)
}

/**
 * 指定の形式の文字列をタイムスタンプに変換する
 * @param str - 時刻の文字列
 * @param format - 時刻のフォーマット
 * @returns 時刻(ms)
 */
export const parse = (str: string, format: string = 'YYYY-MM-DD HH:mm:ss'): Util.Number.Timestamp => {
  return moment(str, format).valueOf()
}
