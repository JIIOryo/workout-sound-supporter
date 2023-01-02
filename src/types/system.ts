import {CONSTANT} from '@'
import {Util} from '@/types'

/**
 * DBのタイプ
 */
export type DbType = Util.ValueOf<typeof CONSTANT.SYSTEM.DB_TYPE>

/**
 * 実行環境
 */
export type Env = Util.ValueOf<typeof CONSTANT.SYSTEM.ENV>
