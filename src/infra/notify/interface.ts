export interface INotify {
  /**
   * シンプルなメッセージの送信
   */
  message(text: string): Promise<void>
}
