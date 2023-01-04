import {Domain} from '@/types'

export type User = {
  /**
   * ユーザーID
   */
  id: Domain.User.UserId
  /**
   * ユーザー名
   */
  name: string
  /**
   * 実行通知設定
   */
  notification: Domain.Notification.UserNotificationConfig
}
