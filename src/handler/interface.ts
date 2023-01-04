import * as server from '@/server'

export interface IHandler {
  exec<ReqQuery = any, ReqParam = any, Req = any, Res = any>(
    req: server.Request.Interface.IRequest<ReqQuery, ReqParam, Req>,
    res: server.Response.Interface.IResponse<Res>,
  ): Promise<void>
}
