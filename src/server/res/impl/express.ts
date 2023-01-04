import * as express from 'express'

import * as server from '@/server'

/**
 * express response
 */
export class ExpressResponse<Res = any> implements server.Response.Interface.IResponse<Res> {
  /**
   * expressのresponse
   */
  private _res: express.Response

  constructor(
    res: express.Response,
  ) {
    this._res = res
  }

  public send(data: Res): void {
    this._res.send(data)
  }

  public redirect(url: string): void {
    this._res.redirect(url)
  }
}
