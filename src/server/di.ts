import {Container} from 'inversify'

import * as server from '@/server'
import * as di from '@/di'
import {Config} from '@/types'

/**
 * Server Injection
 * @param container DI Container
 * @param serverConfig Server Config
 */
export const inject = (container: Container, serverConfig: Config['server']): void => {
  // expressがenabledの場合
  if (serverConfig.express.enabled) {
    container.bind<server.Api.Interface.IApiServer>(di.Identifier.Server.Api).to(server.Api.Impl.ExpressApiServer)
    return
  }

  // それ以外の場合
  throw new Error('not found server')
}
