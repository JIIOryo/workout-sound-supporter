import {inject, injectable} from 'inversify'

import * as handler from '@/handler'
import * as di from '@/di'
import * as domain from '@/domain'
import * as repository from '@/repository'
import * as infra from '@/infra'
import * as server from '@/server'
import {Handler, DB, Util} from '@/types'

@injectable()
export class WorkoutHandler {
  constructor(
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,
    @inject(di.Identifier.Repository.WorkoutMenu) private readonly workoutMenuRepository: repository.Interface.IWorkoutMenuRepository,
    @inject(di.Identifier.Repository.WorkoutHistory) private readonly workoutHistoryRepository: repository.Interface.IWorkoutHistoryRepository,
  ) {}

  /**
   * メニュー一覧取得
   * @param req リクエスト
   * @param res レスポンス
   */
  public getMenuList: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.GetWorkoutMenuList.Request>,
    res: server.Response.Interface.IResponse<Handler.Workout.GetWorkoutMenuList.Response>,
  ): Promise<void> => {
    const workoutMenuList = await this.workoutMenuRepository.getAll()
    res.send({
      list: workoutMenuList,
    })
  }

  /**
   * メニュー取得
   * @param req リクエスト
   * @param res レスポンス
   */
  public getMenu: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.GetMenu.Request, Handler.Workout.GetMenu.Params>,
    res: server.Response.Interface.IResponse<Handler.Workout.GetMenu.Response>,
  ): Promise<void> => {
    const params = req.getParams()
    const workoutMenuId = params.id

    // バリデーション
    if (!domain.workout.isWorkoutMenuId(workoutMenuId)) {
      throw new Error(`Invalid workoutMenuId. workoutMenuId: ${workoutMenuId}`)
    }

    const workoutMenu = await this.workoutMenuRepository.getById(workoutMenuId)
    if (workoutMenu === null) {
      throw new Error(`WorkoutMenu not found. workoutMenuId: ${workoutMenuId}`)
    }

    res.send({
      menu: workoutMenu,
    })
  }

  /**
   * メニュー作成
   * @param req リクエスト
   * @param res レスポンス
   */
  public createMenu: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.CreateWorkoutMenu.Request>,
    res: server.Response.Interface.IResponse<Handler.Workout.CreateWorkoutMenu.Response>,
  ): Promise<void> => {
    const data = req.getData()
    this.logger.debug(`WorkoutHandler.createMenu: data: ${JSON.stringify(data)}`)
  
    const now = Date.now()
    const createdAt = now
    const updatedAt = now

    const newWorkoutMenu: DB.WorkoutMenu = {
      id: domain.workout.generateWorkoutMenuId(),
      ...data,
      createdAt,
      updatedAt,
    }

    await this.workoutMenuRepository.create(newWorkoutMenu)
    res.send({})
  }

  /**
   * メニュー更新
   * @param req リクエスト
   * @param res レスポンス
   */
  public updateMenu: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.UpdateWorkoutMenu.Request, Handler.Workout.UpdateWorkoutMenu.Params>,
    res: server.Response.Interface.IResponse<Handler.Workout.UpdateWorkoutMenu.Response>,
  ): Promise<void> => {
    const data = req.getData()
    const params = req.getParams()
    const workoutMenuId = params.id

    // バリデーション
    if (!domain.workout.isWorkoutMenuId(workoutMenuId)) {
      throw new Error(`invalid workout menu id: ${workoutMenuId}`)
    }

    const workoutMenu = await this.workoutMenuRepository.getById(workoutMenuId)
    if (!workoutMenu) {
      throw new Error(`workout menu not found: ${workoutMenuId}`)
    }

    const now = Date.now()
    const updatedAt = now

    const newWorkoutMenu: DB.WorkoutMenu = {
      ...workoutMenu,
      ...data,
      updatedAt,
    }

    await this.workoutMenuRepository.update(newWorkoutMenu.id, newWorkoutMenu)
    res.send({})
  }

  /**
   * メニュー削除
   * @param req リクエスト
   * @param res レスポンス
   */
  public deleteMenu: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.DeleteWorkoutMenu.Request, Handler.Workout.DeleteWorkoutMenu.Params>,
    res: server.Response.Interface.IResponse<Handler.Workout.DeleteWorkoutMenu.Response>,
  ): Promise<void> => {
    const params = req.getParams()
    const workoutMenuId = params.id

    // バリデーション
    if (!domain.workout.isWorkoutMenuId(workoutMenuId)) {
      throw new Error(`invalid workout menu id: ${workoutMenuId}`)
    }

    const workoutMenu = await this.workoutMenuRepository.getById(workoutMenuId)
    if (!workoutMenu) {
      throw new Error(`workout menu not found: ${workoutMenuId}`)
    }

    await this.workoutMenuRepository.delete(workoutMenuId)
    res.send({})
  }

  /**
   * メニューに沿ってworkoutを実行
   * @param req リクエスト
   * @param res レスポンス
   */
  public playWorkout: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.PlayWorkout.Request>,
    res: server.Response.Interface.IResponse<Handler.Workout.PlayWorkout.Response>,
  ): Promise<void> => {
    const data = req.getData()
    const userId = data.userId
    const workoutMenuId = data.id

    // バリデーション
    if (!domain.workout.isWorkoutMenuId(workoutMenuId)) {
      throw new Error(`invalid workout menu id: ${workoutMenuId}`)
    }

    // メニューの取得
    const workoutMenu = await this.workoutMenuRepository.getById(workoutMenuId)
    // メニューが存在しない場合はエラー
    if (!workoutMenu) {
      throw new Error(`workout menu not found: ${workoutMenuId}`)
    }

    // TODO: メニューに沿ってworkoutの実行

    const now = Date.now()
    const executedAt = now

    // 実行が正常に終了したら履歴を作成
    const newWorkoutHistory: DB.WorkoutHistory = {
      id: domain.workout.generateWorkoutHistoryId(executedAt, workoutMenuId, userId),
      userId,
      workoutMenuId,
      units: workoutMenu.units,
      executedAt,
    }
    await this.workoutHistoryRepository.add(newWorkoutHistory)

    res.send({})
  }

  /**
   * workoutの実行履歴取得
   * @param req リクエスト
   * @param res レスポンス
   */
  public getWorkoutHistoryList: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Workout.GetWorkoutHistoryList.Request>,
    res: server.Response.Interface.IResponse<Handler.Workout.GetWorkoutHistoryList.Response>,
  ): Promise<void> => {
    // workoutの実行履歴一覧の取得
    const workoutMenuList = await this.workoutMenuRepository.getAll()
    res.send({
      list: workoutMenuList,
    })
  }
}
