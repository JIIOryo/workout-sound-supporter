/**
 * Request interface
 */
export interface IRequest<
  Req = any,
  Params = any,
  Query = any,
> {
  /**
   * データを取得する
   */
  getData: () => Req
  /**
   * paramsを取得する
   */
  getParams: () => Params
  /**
   * クエリパラメータを取得する
   */
  getQuery: () => Query
}
