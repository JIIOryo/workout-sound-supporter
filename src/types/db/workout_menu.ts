import {Util, Domain} from '@/types'

/**
 * Workoutのメニュー
 */
export type WorkoutMenu = {
  /**
   * WorkoutのメニューID
   */
  id: Domain.Workout.WorkoutMenuId
  /**
   * メニューの名前
   */
  name: string
  /**
   * 説明
   */
  description: string
  /**
   * 構成するメニューのunit一覧
   */
  units: Domain.Workout.WorkoutMenuUnit[]
  /**
   * 作成日時
   */
  createdAt: Util.Number.Timestamp
  /**
   * 最終更新日時
   */
  updatedAt: Util.Number.Timestamp
}