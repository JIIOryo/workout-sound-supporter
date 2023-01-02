import {Util, Domain} from '@/types'
/**
 * ランニングのメニューID
 */
export type RunningMenuId = string

/**
 * ランニングの履歴ID
 */
export type RunningHistoryId = `${Util.Number.Timestamp}${Domain.Common.IdDelimiter}${RunningMenuId}${Domain.Common.IdDelimiter}${Domain.User.UserId}`
