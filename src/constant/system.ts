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
 * Loggerのタイプ
 */
export const LOGGER_TYPE = {
  CONSOLE: 'console',
  CONSOLE_WITH_FILE: 'console_with_file',
} as const

/**
 * 実行環境
 */
export const ENV = {
  LOCAL: 'local',
  STG: 'stg',
  PRD: 'prd',
} as const

/**
 * line notifyのURL
 */
export const LINE_NOTIFY_URL = 'https://notify-api.line.me/api/notify'
