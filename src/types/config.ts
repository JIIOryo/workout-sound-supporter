import {System, Util} from '@/types'

/** serverのexpressを利用する場合の設定 */
type ServerExpressEnabledTrue = {
  /** 利用するかどうか */
  enabled: true
  /** サーバーのport番号 */
  port: Util.Port
}
/** serverのexpressを利用しない場合の設定 */
type ServerExpressEnabledFalse = {
  /** 利用するかどうか */
  enabled: false
}
/** serverのexpressの設定 */
export type ServerExpress =
  | ServerExpressEnabledTrue
  | ServerExpressEnabledFalse

/**
 * Configの型
 */
export type Config = {
  /** DBの設定 */
  db: {
    /** 使用するDBのタイプ */
    type: System.DbType
  }
  /** loggerの設定 */
  logger: {
    /** 使用するloggerのタイプ */
    type: System.LoggerType
  }
  /** serverの設定 */
  server: {
    /** expressの設定 */
    express: ServerExpress
  }
}
