import {DB, Domain} from '@/types'

export interface IWorkoutMenuRepository {
  /**
   * 全件取得
   */
  getAll(): Promise<DB.WorkoutMenu[]>
  /**
   * 1件をIDで取得
   */
  getById(id: Domain.Workout.WorkoutMenuId): Promise<DB.WorkoutMenu | null>
  /**
   * 新規作成
   */
  create(workoutMenu: DB.WorkoutMenu): Promise<void>
  /**
   * 更新
   */
  update(id: Domain.Workout.WorkoutMenuId, workoutMenu: DB.WorkoutMenu): Promise<void>
  /**
   * 削除
   */
  delete(id: Domain.Workout.WorkoutMenuId): Promise<void>
}
