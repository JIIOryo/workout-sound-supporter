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

    // workout
    @inject(di.Identifier.Handler.Workout) private readonly workoutHandler: handler.Impl.WorkoutHandler,
    // @inject(di.Identifier.Handler.Run) private readonly runHandler: handler.Impl.RunHandler,
    // @inject(di.Identifier.Handler.Meal) private readonly mealHandler: handler.Impl.MealHandler,
  ) {
    this.app = express()
    this.app.disable('x-powered-by')
  }

  /**
   * ミドルウェアをセットアップする
   */
  private setupMiddleware(): void {
    // jsonを使用する
    this.app.use(express.json())

    // POST, PUTの場合はContent-Typeがapplication/jsonであることを確認する
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction): void => {
      if (req.method !== 'POST' && req.method !== 'PUT') {
        next()
        return
      }
      const contentType = req.headers['content-type']
      if (contentType !== 'application/json') {
        res.status(400).json({
          message: 'Invalid Content-Type'
        })
        return
      }
      next()
    })

    // アクセスログを出力する
    this.app.use(this.accessLogger)
  }

  /**
   * アクセスログを出力する
   * @param req リクエスト
   * @param res レスポンス
   * @param next next function
   */
  private accessLogger = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const {method, headers, body, path} = req
    const {statusCode} = res
    const userAgent = headers['user-agent']
    const jsonBody = method === 'GET' ? '' : JSON.stringify(body)
    this.logger.info(`[${method}] ${path}, data: "${jsonBody}", statusCode: ${statusCode}, userAgent: ${userAgent}`)
    next()
  }

  /**
   * routerのkeyをパースする
   * @param routerKey routerのkey
   * @returns 結果
   */
  private _parseRouterKey(routerKey: Util.Http.RouterKey): {methodLowercase: Lowercase<Util.Http.Method>, path: string} {
    const routerKeySplitedByDelimiter = routerKey.split(CONSTANT.UTIL.HTTP_METHOD_PATH_DELIMITER)
    const method = routerKeySplitedByDelimiter[0]

    if (!_.includes(CONSTANT.UTIL.HTTP_METHOD, method)) {
      throw new Error(`invalid method: ${method}`)
    }

    /**
     * HTTPパス
     * - pathにデリミタが含まれる場合を考慮
     * @example '/user/:id'
     */
    const path = routerKeySplitedByDelimiter.slice(1).join(CONSTANT.UTIL.HTTP_METHOD_PATH_DELIMITER)

    return {
      methodLowercase: method.toLowerCase() as Lowercase<Util.Http.Method>,
      path,
    }
  }

  private setupRoutes(): void {
    const router = express.Router()

    const route: Util.Dictionary<Util.Http.RouterKey, handler.Interface.IHandlerFunction> = {
      // workout
      'GET:/workout/menu': this.workoutHandler.getMenuList,
      'GET:/workout/menu/:id': this.workoutHandler.getMenu,
      'POST:/workout/menu': this.workoutHandler.createMenu,
      'PUT:/workout/menu/:id': this.workoutHandler.updateMenu,
      'DELETE:/workout/menu/:id': this.workoutHandler.deleteMenu,
      'POST:/workout/play': this.workoutHandler.playWorkout,
      'DELETE:/workout/play': this.workoutHandler.stopWorkout,
      'GET:/workout/history': this.workoutHandler.getWorkoutHistoryList,

      // running
      // 'GET:/run/menu': this.runHandler.getMenuList,
      // 'GET:/run/menu/:id': this.runHandler.getMenu,
      // 'POST:/run/menu': this.runHandler.createMenu,
      // 'PUT:/run/menu/:id': this.runHandler.updateMenu,
      // 'DELETE:/run/menu/:id': this.runHandler.deleteMenu,
      // 'POST:/run/menu/play': this.runHandler.playMenu,
      // 'GET:/run/history': this.runHandler.getHistoryList,

      // // meal
      // 'POST:/meal/history': this.mealHandler.createMealHistory,
      // 'GET:/meal/history': this.mealHandler.getMealHistoryList,
      // 'DELETE:/meal/history/:id': this.mealHandler.deleteMealHistory,
    }

    _.each(route, (handler, routerKey) => {
      const {methodLowercase, path} = this._parseRouterKey(routerKey)
      router[methodLowercase](path, server.helper.express.handlerFunctionWrapper(handler))
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
