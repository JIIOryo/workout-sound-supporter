import {Util} from '@/types'

export * as Interface from './interface'
export * as Impl from './impl'

export * as di from './di'

/** サウンダのステータス */
export const SOUND_PLAY_STATUS = {
  SUCCESS: 'success',
  STOP: 'stop',
  FAILURE: 'failure',
} as const

/** サウンダのステータス */
export type SoundPlayStatus = Util.ValueOf<typeof SOUND_PLAY_STATUS>
