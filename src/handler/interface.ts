import * as server from '@/server'

export type IHandlerFunction<ReqQuery = any, ReqParam = any, Req = any, Res = any> = (
  req: server.Request.Interface.IRequest<Req, ReqQuery, ReqParam>,
  res: server.Response.Interface.IResponse<Res>,
) => Promise<void>
