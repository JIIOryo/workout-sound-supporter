/**
 * Request interface
 */
export interface IRequest<
  Query = any,
  Params = any,
  Req = any,
> {
  /**
   * データを取得する
   */
  getData: () => Req
  /**
   * クエリパラメータを取得する
   */
  getQuery: () => Query
  /**
   * paramsを取得する
   */
  getParams: () => Params
}
