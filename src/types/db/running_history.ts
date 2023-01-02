import {Domain, Util} from '@/types'

export type RunningHistory = {
  /**
   * ランニング履歴ID
   */
  id: Domain.Running.RunningHistoryId
  /**
   * 実行ユーザーID
   */
  userId: Domain.User.UserId
  /**
   * 実行したランニングのメニューのID
   */
  runningMenuId: Domain.Running.RunningMenuId
  /**
   * 実行日時
   */
  executedAt: Util.Number.Timestamp
}