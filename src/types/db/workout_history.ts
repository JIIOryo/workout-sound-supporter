import {Util, Domain} from '@/types'

export type WorkoutHistory = {
  /**
   * Workoutの履歴ID
   */
  id: Domain.Workout.WorkoutHistoryId
  /**
   * 実行ユーザーID
   */
  userId: Domain.User.UserId
  /**
   * 実行したWorkoutのメニューのID
   */
  workoutMenuId: Domain.Workout.WorkoutMenuId
  /**
   * メニュー内容
   * - メニューの内容が変更された場合でも、履歴には変更前の内容が残る
   * - 実行時のメニューの中身がそのままコピーされる
   */
  units: Domain.Workout.WorkoutMenuUnit[]
  /**
   * 実行日時
   */
  executedAt: Util.Number.Timestamp
}
