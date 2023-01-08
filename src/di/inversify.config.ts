import * as dotenv from 'dotenv'
import {Container} from 'inversify'

import * as _config from '@/config'
import * as repository from '@/repository'
import * as infra from '@/infra'
import * as domain from '@/domain'
import * as server from '@/server'
import * as handler from '@/handler'
import {Identifier} from './identifier'
import * as util from '@/util'
import {Config} from '@/types'

dotenv.config()

const rootContainer = new Container()

const ENV = process.env.ENV
if (!util.typeGuard.isEnv(ENV)) {
  throw new Error('invalid ENV')
}

const config = _config[ENV]

// configのinject
rootContainer.bind<Config>(Identifier.Config).toConstantValue(config)

// repositoryのinject
repository.di.inject(rootContainer, config.db)

// loggerのinject
infra.logger.di.inject(rootContainer, config.logger)

// serverのinject
server.di.inject(rootContainer, config.server)

// handlerのinject
handler.di.inject(rootContainer)

// notifyのinject
infra.notify.di.inject(rootContainer, config.notification)

// soundのinject
infra.sound.di.inject(rootContainer, config.sound)

// versionのinject
infra.version.di.inject(rootContainer)

// domainのinject
domain.di.inject(rootContainer)

/**
 * inject済のDI Container
 */
export const container = rootContainer.createChild()
