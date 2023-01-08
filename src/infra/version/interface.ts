export interface IVersion {
  /**
   * サーバーのバージョンを取得する
   * @returns バージョン情報
   */
  get: () => Promise<string>
}
