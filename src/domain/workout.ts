import * as lib from '@/lib'
import {CONSTANT} from '@'
import {DB, Domain, Util} from '@/types'

const _ = lib._

/**
 * WorkoutMenuIdを生成する
 * @returns workoutMenuId
 */
export const generateWorkoutMenuId = (): string => {
  return _.generateUuid()
}

/**
 * WorkoutMenuIdかどうかを判定する
 * @param str 文字列
 * @returns 文字列がWorkoutMenuIdの場合はtrue
 */
export const isWorkoutMenuId = (str: string): str is Domain.Workout.WorkoutMenuId => {
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
export const generateWorkoutHistoryId = (
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
export const isCorrectWorkoutMenu = (workout: unknown): workout is DB.WorkoutMenu => {
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
  if (!workoutMenu.units.every(isCorrectWorkoutMenuUnit)) {
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
export const isCorrectWorkoutMenuUnit = (workoutMenuUnit: unknown): workoutMenuUnit is Domain.Workout.WorkoutMenuUnit => {
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
export const buildWorkoutNotificationMessage = (workoutMenu: DB.WorkoutMenu): string => {
  return `
  「${workoutMenu.name}」をやったよ！🎉
  ${workoutMenu.units.map((unit) => {
    return `\n・「${unit.name}」を${unit.intervalSec}秒間隔で${unit.soundCount}回 × ${unit.setCount}セット`
  }).join('')}
  `
}
