import express from 'express'

import {injectable, inject} from 'inversify'
import * as lib from '@/lib'
import {CONSTANT} from '@'
import * as di from '@/di'
import * as server from '@/server'
import * as infra from '@/infra'
import * as handler from '@/handler'
import {Config, Util} from '@/types'

const _ = lib._

@injectable()
export class ExpressApiServer implements server.Api.Interface.IApiServer {
  /**
   * express
   * @private
   * @readonly
   */
  private readonly app: express.Express

  constructor(
    @inject(di.Identifier.Config) private readonly config: Config,
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,

    @inject(di.Identifier.Handler.Workout.GetMenus) private readonly workoutGetMenusHandler: handler.Interface.IHandler,
  ) {
    this.app = express()
    this.app.disable('x-powered-by')
  }

  private setupMiddleware(): void {
  }

  /**
   * routerのkeyをパースする
   * @param routerKey routerのkey
   * @returns 結果
   */
  private _parseRouterKey(routerKey: Util.Http.RouterKey): {methodLowercase: Lowercase<Util.Http.Method>, path: string} {
    const [method, path] = routerKey.split(CONSTANT.UTIL.HTTP_METHOD_PATH_DELIMITER)

    if (!_.includes(CONSTANT.UTIL.HTTP_METHOD, method)) {
      throw new Error(`invalid method: ${method}`)
    }

    return {
      methodLowercase: method.toLowerCase() as Lowercase<Util.Http.Method>,
      path,
    }
  }

  private setupRoutes(): void {
    const router = express.Router()

    const route: Util.Dictionary<Util.Http.RouterKey, handler.Interface.IHandler> = {
      'GET:/workout/menus': this.workoutGetMenusHandler,
    }

    _.each(route, (handler, routerKey) => {
      const {methodLowercase, path} = this._parseRouterKey(routerKey)
      router[methodLowercase](path, server.helper.express.handlerWrapper(handler))
      this.logger.info(`add route: ${routerKey}`)
    })

    this.app.use('/', router)
  }

  public async setup(): Promise<void> {
    this.setupMiddleware()
    this.setupRoutes()
  }

  public async start(): Promise<void> {
    // expressがenabled=falseの場合にこのメソッドが呼ばれた場合はエラー
    if (!this.config.server.express.enabled) {
      throw new Error('express server is not enabled but start() is called.')
    }

    this.app.listen(this.config.server.express.port)
    this.logger.info(`express server start! port: ${this.config.server.express.port}`)
  }

  public async stop(): Promise<void> {
    this.logger.debug('ExpressApiServer.stop()')
  }
}
