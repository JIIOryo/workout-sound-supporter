import * as express from 'express'

import {logger} from '@'
import * as server from '@/server'
import * as handler from '@/handler'

/**
 * handlerFunctionのasyncメソッドをexpressのrouterに渡せる形式にする
 * @param handlerFunction handlerFunction
 * @param converter handlerFunctionとフロントエンドのデータの型を変換する関数群
 * @returns expressのrouterに渡せる形式
 */
export const handlerFunctionWrapper = (handlerFunction: handler.Interface.IHandlerFunction): (expressReq: express.Request, expressRes: express.Response, _next: express.NextFunction) => Promise<void> => {
  return async (expressReq: express.Request, expressRes: express.Response, _next: express.NextFunction): Promise<void> => {
    // expressのRequestをinterfaceのRequestに変換する
    const req = new server.Request.Impl.ExpressRequest(expressReq)
    // expressのRequestをinterfaceのResponseに変換する
    const res = new server.Response.Impl.ExpressResponse(expressRes)
    return handlerFunction(req, res).catch((e: Error) => {
      // FIXME: 何かしらのエラーがthrowされた場合はとりあえず500を返す
      logger.error(e)
      expressRes.status(500).send({error: e.message})
    })
  }
}
