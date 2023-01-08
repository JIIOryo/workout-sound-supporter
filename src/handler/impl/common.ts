import {inject, injectable} from 'inversify'

import * as handler from '@/handler'
import * as di from '@/di'
import * as domain from '@/domain'
import * as repository from '@/repository'
import * as infra from '@/infra'
import * as server from '@/server'
import {Handler, DB, Config} from '@/types'

@injectable()
export class CommonHandler {
  constructor(
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,
    @inject(di.Identifier.Infra.Version) private readonly version: infra.version.Interface.IVersion,
  ) {}

  /**
   * versionを取得
   * @param req リクエスト
   * @param res レスポンス
   */
  public getVersion: handler.Interface.IHandlerFunction = async (
    req: server.Request.Interface.IRequest<Handler.Common.GetVersion.Request>,
    res: server.Response.Interface.IResponse<Handler.Common.GetVersion.Response>,
  ): Promise<void> => {
    const version = await this.version.get()
    res.send({
      version,
    })
    return
  }
}
