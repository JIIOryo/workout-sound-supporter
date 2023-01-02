import {Util, Domain} from '@/types'

/**
 * Workout履歴のID
 */
export type WorkoutHistoryId = `${Util.Number.Timestamp}${Domain.Common.IdDelimiter}${WorkoutMenuId}${Domain.Common.IdDelimiter}${Domain.User.UserId}`

/**
 * WorkoutメニューのID
 */
export type WorkoutMenuId = string

/**
 * Workoutのメニューを構成する最小単位
 */
export type WorkoutMenuUnit = {
  /**
   * unitの名前
   * @example '腕立て伏せ'
   */
  name: string
  /**
   * サウンドの間隔(sec)
   * @example 1
   */
  intervalSec: Util.Number.Seconds
  /**
   * 1セットにサウンドが鳴る回数
   * @example 25
   */
  soundCount: number
  /**
   * セット数
   * @example 3
   */
  setCount: number
  /**
   * unitの終了後の休憩時間(sec)
   * @example 60
   */
  restSec: Util.Number.Seconds
}
