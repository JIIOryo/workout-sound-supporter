import {Domain} from '@/types'

export type RunningMenu = {
  /**
   * ランニングのメニューID
   */
  id: Domain.Running.RunningMenuId
  /**
   * メニューの名前
   * @example '家と駒沢大学駅前の往復'
   */
  name: string
  /**
   * 走行距離(km)
   * @example 8.7
   */
  distanceKm: number
}
