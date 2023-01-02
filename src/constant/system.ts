/**
 * 通知送信先
 */
export const NOTIFICATION_TYPE = {
  LINE_NOTIFY: 'LINE_NOTIFY',
} as const

/**
 * jsonのDBを格納するディレクトリ名
 */
export const DB_DIRNAME = 'db'

 /**
  * DBのタイプ
  */
export const DB_TYPE = {
  JSON: 'json',
} as const

/**
 * 実行環境
 */
export const ENV = {
  LOCAL: 'local',
  PRD: 'prd',
} as const
