/**
 * APIサーバーのinterface
 */
export interface IApiServer {
  /** 初期化 */
  setup(): Promise<void>
  /** 起動 */
  start(): Promise<void>
  /** 終了 */
  stop(): Promise<void>
}
