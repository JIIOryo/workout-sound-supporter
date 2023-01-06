import {injectable, inject} from 'inversify'

import * as lib from '@/lib'
import {CONSTANT} from '@'
import * as infra from '@/infra'
import * as repository from '@/repository'
import * as di from '@/di'
import {DB, Domain, Util} from '@/types'

const _ = lib._

@injectable()
export class WorkoutDomain {
  constructor(
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,
    @inject(di.Identifier.Infra.Notify) private readonly notify: infra.notify.Interface.INotify,
    @inject(di.Identifier.Infra.Sound) private readonly sound: infra.sound.Interface.ISound,
    @inject(di.Identifier.Repository.WorkoutHistory) private readonly workoutHistoryRepository: repository.Interface.IWorkoutHistoryRepository,
  ) {}

  /**
   * WorkoutMenuIdを生成する
   * @returns workoutMenuId
   */
  public generateWorkoutMenuId = (): Domain.Workout.WorkoutMenuId => {
    return _.generateUuid()
  }
  
  /**
   * WorkoutMenuIdかどうかを判定する
   * @param str 文字列
   * @returns 文字列がWorkoutMenuIdの場合はtrue
   */
  public isWorkoutMenuId = (str: string): str is Domain.Workout.WorkoutMenuId => {
    // タイプのチェック
    if (!(typeof str === 'string')) {
      return false
    }
    // 文字数のみチェック
    return str.length > 0
  }
  
  /**
   * WorkoutMenuUnitIdを生成する
   * @param executedAt 実行日時
   * @param workoutMenuId メニューID
   * @param userId ユーザーID
   * @returns workoutHistoryId
   */
  public generateWorkoutHistoryId = (
    executedAt: Util.Number.Timestamp,
    workoutMenuId: Domain.Workout.WorkoutMenuId,
    userId: Domain.User.UserId,
  ): Domain.Workout.WorkoutHistoryId => {
    return `${executedAt}${CONSTANT.ID_DELIMITER}${workoutMenuId}${CONSTANT.ID_DELIMITER}${userId}`
  }
  
  /**
   * 正しいWorkoutMenuかどうかを判定する
   * @param workout 与えられたobjectがWorkoutMenuかどうかを判定する
   * @returns 与えられたobjectがWorkoutMenuの場合はtrue
   */
  public static isCorrectWorkoutMenu = (workout: unknown): workout is DB.WorkoutMenu => {
    // objectではない場合はエラー
    if (!(typeof workout === 'object' && workout !== null)) {
      return false
    }
  
    // プロパティの存在チェック
    const workoutMenu = workout as DB.WorkoutMenu
    
    // workoutMenuUnitのチェック
    if (!Array.isArray(workoutMenu.units)) {
      return false
    }
    if (!workoutMenu.units.every(WorkoutDomain.isCorrectWorkoutMenuUnit)) {
      return false
    }
  
    return (
      typeof workoutMenu.id === 'string' &&
      typeof workoutMenu.name === 'string' &&
      typeof workoutMenu.description === 'string' &&
      typeof workoutMenu.createdAt === 'number' &&
      typeof workoutMenu.updatedAt === 'number'
    )
  }
  
  /**
   * 正しいWorkoutMenuUnitかどうかを判定する
   * @param workoutUnit workoutのunit
   * @returns 与えられたobjectがWorkoutMenuUnitの場合はtrue
   */
  public static isCorrectWorkoutMenuUnit = (workoutMenuUnit: unknown): workoutMenuUnit is Domain.Workout.WorkoutMenuUnit => {
    // objectではない場合はエラー
    if (!(typeof workoutMenuUnit === 'object' && workoutMenuUnit !== null)) {
      return false
    }
  
    // プロパティの存在チェック
    return (
      typeof (workoutMenuUnit as Domain.Workout.WorkoutMenuUnit).name === 'string' &&
      typeof (workoutMenuUnit as Domain.Workout.WorkoutMenuUnit).intervalSec === 'number' &&
      typeof (workoutMenuUnit as Domain.Workout.WorkoutMenuUnit).soundCount === 'number' &&
      typeof (workoutMenuUnit as Domain.Workout.WorkoutMenuUnit).setCount === 'number' &&
      typeof (workoutMenuUnit as Domain.Workout.WorkoutMenuUnit).restSec === 'number'
    )
  }
  
  /**
   * workoutの実行通知用メッセージを生成する
   * @param workoutMenu メニュー
   * @returns メッセージ
   */
  public buildWorkoutNotificationMessage = (workoutMenu: DB.WorkoutMenu): string => {
    return `
    「${workoutMenu.name}」をやったよ！🎉
    ${workoutMenu.units.map((unit) => {
      return `\n・「${unit.name}」を${unit.intervalSec}秒間隔で${unit.soundCount}回 × ${unit.setCount}セット`
    }).join('')}
    `
  }
  
  /**
   * worukout実行
   * @param userId ユーザーID
   * @param menu メニューのユニット
   */
  public play = async (userId: Domain.User.UserId, menu: DB.WorkoutMenu): Promise<void> => {
    // 実行: サウンドを鳴らす
    const result = await this.sound.play(menu.units)

    // エラーが発生したら失敗通知を送信して終了
    if (result.status === infra.sound.SOUND_PLAY_STATUS.FAILURE) {
      this.logger.error(`An error occurred while running the sounder! ${result.message}`)
      await this.notify.message(`⚠️サウンドの再生時にエラーが発生しました。\n\nエラー内容\n${result.message}`)
      return
    }
    // 強制終了した場合はログを出力して終了
    if (result.status === infra.sound.SOUND_PLAY_STATUS.STOP) {
      this.logger.warn('Sounder was forced to terminate.')
      return
    }

    const now = Date.now()
    const executedAt = now
  
    // 実行が正常に終了したら履歴を作成
    const newWorkoutHistory: DB.WorkoutHistory = {
      id: this.generateWorkoutHistoryId(executedAt, menu.id, userId),
      userId,
      workoutMenuId: menu.id,
      units: menu.units,
      executedAt,
    }
    await this.workoutHistoryRepository.add(newWorkoutHistory)
  
    // 通知を送信する
    await this.notify.message(this.buildWorkoutNotificationMessage(menu))
  }

  /**
   * サウンドを停止する
   */
  public async stop(): Promise<void> {
    this.logger.warn('Sounder was forced to terminate.')
    await this.sound.stop()
  }
}
