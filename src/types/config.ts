import {System} from '@/types'

/**
 * Configの型
 */
export type Config = {
  /** DBの設定 */
  db: {
    /** 使用するDBのタイプ */
    type: System.DbType
  }
}
