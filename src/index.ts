// export, importは依存関係の順番ごとに行う
export * as CONSTANT from '@/constant'

import * as lib from '@/lib'
import * as di from '@/di'
import * as infra from '@/infra'
import * as _server from '@/server'

export * as config from '@/config'
export * as util from '@/util'
export * as domain from '@/domain'
export {infra, lib}

/** logger */
export const logger = di.container.get<infra.logger.Interface.ILogger>(di.Identifier.Infra.Logger)
/** APIサーバー */
export const server = di.container.get<_server.Api.Interface.IApiServer>(di.Identifier.Server.Api)
/** version */
export const version = di.container.get<infra.version.Interface.IVersion>(di.Identifier.Infra.Version)
