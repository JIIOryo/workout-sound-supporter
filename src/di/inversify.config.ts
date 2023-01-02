import * as dotenv from 'dotenv'
import {Container} from 'inversify'

import * as _config from '@/config'
import * as repository from '@/repository'
import {CONSTANT, util} from '@'

dotenv.config()

const ENV = process.env.ENV
if (!util.typeGuard.isEnv(ENV)) {
  throw new Error('invalid ENV')
}

const config = _config[ENV]

const rootContainer = new Container()

repository.di.inject(rootContainer, config.db)

/**
 * inject済のDI Container
 */
export const container = rootContainer.createChild()
