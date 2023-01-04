import * as express from 'express'

import {logger} from '@'
import * as server from '@/server'
import * as handler from '@/handler'

/**
 * handlerのasyncメソッドをexpressのrouterに渡せる形式にする
 * @param handler handler
 * @param converter handlerとフロントエンドのデータの型を変換する関数群
 * @returns expressのrouterに渡せる形式
 */
export const handlerWrapper = (handler: handler.Interface.IHandler): (expressReq: express.Request, expressRes: express.Response, _next: express.NextFunction) => Promise<void> => {
  return async (expressReq: express.Request, expressRes: express.Response, _next: express.NextFunction): Promise<void> => {
    // expressのRequestをinterfaceのRequestに変換する
    const req = new server.Request.Impl.ExpressRequest(expressReq)
    // expressのRequestをinterfaceのResponseに変換する
    const res = new server.Response.Impl.ExpressResponse(expressRes)
    return handler.exec(req, res).catch((e) => {
      // 何かしらのエラーがthrowされた場合
      logger.error(e)
    })
  }
}
