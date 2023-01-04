import {injectable} from 'inversify'

import {infra, CONSTANT, domain} from '@'
import {DB, Domain} from '@/types'
import {Interface} from '@/repository'

@injectable()
export class WorkoutMenuJsonFileRepository implements Interface.IWorkoutMenuRepository {
  /**
   * JSONのファイルを読み書きするクライアント
   */
  private readonly workoutMenuJsonFileClient: infra.jsonFile.JsonFileClient<DB.WorkoutMenu[]> = new infra.jsonFile.JsonFileClient<DB.WorkoutMenu[]>(`${CONSTANT.SYSTEM.DB_DIRNAME}/workout_menu.json`)

  async getAll(): Promise<DB.WorkoutMenu[]> {
    const result = await this.workoutMenuJsonFileClient.read()
    return result ?? []
  }

  async getById(id: Domain.Workout.WorkoutMenuId): Promise<DB.WorkoutMenu | null> {
    const workoutMenus = await this.getAll()
    const result = workoutMenus.find((workoutHistory) => workoutHistory.id === id)
    return result ?? null
  }

  async create(workoutMenu: DB.WorkoutMenu): Promise<void> {
    // 作成前にバリデーションを行う
    if (!domain.workout.isCorrectWorkoutMenu(workoutMenu)) {
      throw new Error(`Invalid workoutMenu. workoutMenu: ${JSON.stringify(workoutMenu)}`)
    }

    const workoutMenus = (await this.workoutMenuJsonFileClient.read()) ?? []
    workoutMenus.push(workoutMenu)
    await this.workoutMenuJsonFileClient.write(workoutMenus)
  }

  async update(id: Domain.Workout.WorkoutMenuId, workoutMenu: DB.WorkoutMenu): Promise<void> {
    // 更新前にバリデーションを行う
    if (!domain.workout.isCorrectWorkoutMenu(workoutMenu)) {
      throw new Error(`Invalid workoutMenu. workoutMenu: ${JSON.stringify(workoutMenu)}`)
    }

    const workoutMenus = (await this.workoutMenuJsonFileClient.read()) ?? []
    const index = workoutMenus.findIndex((workoutHistory) => workoutHistory.id === id)
    if (index === -1) {
      throw new Error(`WorkoutMenu not found. id: ${id}`)
    }
    workoutMenus[index] = workoutMenu
    await this.workoutMenuJsonFileClient.write(workoutMenus)
  }

  async delete(id: Domain.Workout.WorkoutMenuId): Promise<void> {
    const workoutMenus = (await this.workoutMenuJsonFileClient.read()) ?? []
    const index = workoutMenus.findIndex((workoutHistory) => workoutHistory.id === id)
    if (index === -1) {
      throw new Error(`WorkoutMenu not found. id: ${id}`)
    }
    workoutMenus.splice(index, 1)
    await this.workoutMenuJsonFileClient.write(workoutMenus)
  }
}
