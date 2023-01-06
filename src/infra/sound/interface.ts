import {Domain} from '@/types'
import * as sound from '@/infra/sound'

/** サウンド再生の終了が成功した場合 */
type SoundPlayStatusIsSuccessful = {
  /** 実行に成功 */
  status: typeof sound.SOUND_PLAY_STATUS.SUCCESS
}
type SoundPlayStatusIsForcedStop = {
  /** 強制停止 */
  status: typeof sound.SOUND_PLAY_STATUS.STOP
}
/** サウンド再生の終了が失敗した場合 */
type SoundPlayStatusIsNotSuccessful = {
  /** 実行に失敗 */
  status: typeof sound.SOUND_PLAY_STATUS.FAILURE
  /** 失敗の理由 */
  message: string
}
/**
 * サウンド再生の終了ステータス
 */
export type SoundPlayStatus =
  | SoundPlayStatusIsSuccessful
  | SoundPlayStatusIsForcedStop
  | SoundPlayStatusIsNotSuccessful

export interface ISound {
  /**
   * メニューに従って音を鳴らす
   * @returns 終了ステータス
   */
  play(units: Domain.Workout.WorkoutMenuUnit[]): Promise<SoundPlayStatus>
  /**
   * 再生を終了する
   */
  stop(): Promise<void>
}
