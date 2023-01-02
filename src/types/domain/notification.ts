import {CONSTANT} from '@'
import {Util} from '@/types'

/**
 * 通知タイプ
 */
export type NotificationType = Util.ValueOf<typeof CONSTANT.SYSTEM.NOTIFICATION_TYPE>

/**
 * 通知送信先のLINE Notifyが有効の場合の設定
 */
export type NotificationLineNotifyConfigEnabledTrue = {
  /**
   * 有効
   */
  enabled: true
  /**
   * LINE Notifyのアクセストークン
   */
  accessToken: string
}
/**
 * 通知送信先のLINE Notifyが無効の場合の設定
 */
export type NotificationLineNotifyConfigEnabledFalse = {
  /**
   * 無効
   */
  enabled: false
}

/**
 * LineNotifyの送信先の設定
 */
export type NotificationLineNotifyConfig =
  | NotificationLineNotifyConfigEnabledTrue
  | NotificationLineNotifyConfigEnabledFalse

/**
 * ユーザーの実行通知送信先の無効な場合の設定
 */
type UserNotificationConfigEnabledFalse = {
  /**
   * 通知を送信しない
   */
  enabled: false
}
/**
 * ユーザーの実行通知送信先の有効な場合の設定
 */
type UserNotificationConfigEnabledTrue = {
  /**
   * 通知を送信する
   */
  enabled: true
  /**
   * Line Notifyの場合の設定
   */
  lineNotify: NotificationLineNotifyConfig
}

/**
 * ユーザーの実行通知送信先の設定
 */
export type UserNotificationConfig =
  | UserNotificationConfigEnabledFalse
  | UserNotificationConfigEnabledTrue
