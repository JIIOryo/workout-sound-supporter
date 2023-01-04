import * as express from 'express'

import * as server from '@/server'

/**
 * express request
 */
export class ExpressRequest<Query = any, Params = any, ReqSchema = any> implements server.Request.Interface.IRequest<Query, Params, ReqSchema> {
  /**
   * expressのrequest
   */
  private _req: express.Request
  /**
   * クエリパラメータを取得する
   */
  private query: Query
  /**
   * paramsを取得する
   */
  private params: Params
  /**
   * リクエストdata型
   */
  private data: ReqSchema

  constructor(
    req: express.Request,
  ) {
    this._req = req
    // @ts-expect-error TS-2322 型を合わせる
    this.query = this._req.query
    // @ts-expect-error TS-2322 型を合わせる
    this.params = this._req.params
    this.data = this._req.body
  }

  public getData(): ReqSchema {
    return this.data
  }

  public getQuery(): Query {
    return this.query
  }

  public getParams(): Params {
    return this.params
  }
}
