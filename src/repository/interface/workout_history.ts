import {DB} from '@/types'

export interface IWorkoutHistoryRepository {
  /**
   * 全件取得
   */
  getAll(): Promise<DB.WorkoutHistory[]>
  /**
   * 追加
   */
  add(workoutHistory: DB.WorkoutHistory): Promise<void>
}
