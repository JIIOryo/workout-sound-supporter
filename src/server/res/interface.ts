/**
 * Response interface
 */
export interface IResponse<Res = any> {
  /**
   * レスポンスを送信する
   */
  send: (data: Res) => void
  /**
   * リダイレクトする
   */
  redirect: (url: string) => void
}
