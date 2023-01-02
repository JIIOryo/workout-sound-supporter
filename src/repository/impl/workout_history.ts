import {injectable} from 'inversify'

import {infra, CONSTANT} from '@'
import {DB} from '@/types'
import {Interface} from '@/repository'

@injectable()
export class WorkoutHistoryJsonFileRepository implements Interface.IWorkoutHistoryRepository {
  /**
   * JSONのファイルを読み書きするクライアント
   */
  private readonly workoutHistoryJsonFileClient: infra.jsonFile.JsonFileClient<DB.WorkoutHistory[]> = new infra.jsonFile.JsonFileClient<DB.WorkoutHistory[]>(`${CONSTANT.SYSTEM.DB_DIRNAME}/workout_history.json`)

  async getAll(): Promise<DB.WorkoutHistory[]> {
    const result = await this.workoutHistoryJsonFileClient.read()
    return result ?? []
  }

  async add(workoutHistory: DB.WorkoutHistory): Promise<void> {
    const workoutHistories = (await this.workoutHistoryJsonFileClient.read()) ?? []
    workoutHistories.push(workoutHistory)
    await this.workoutHistoryJsonFileClient.write(workoutHistories)
  }
}