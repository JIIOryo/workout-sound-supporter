import {Container} from 'inversify'

import {CONSTANT} from '@'
import * as infra from '@/infra'
import * as di from '@/di'
import {Config} from '@/types'

/**
 * Logger Injection
 * @param container DI Container
 * @param loggerConfig Logger Config
 */
export const inject = (container: Container, loggerConfig: Config['logger']): void => {
  switch (loggerConfig.type) {
    case CONSTANT.SYSTEM.LOGGER_TYPE.CONSOLE: {
      container.bind<infra.logger.Interface.ILogger>(di.Identifier.Infra.Logger).to(infra.logger.Impl.ConsoleLogger)
      break
    }
    case CONSTANT.SYSTEM.LOGGER_TYPE.CONSOLE_WITH_FILE: {
      container.bind<infra.logger.Interface.ILogger>(di.Identifier.Infra.Logger).to(infra.logger.Impl.ConsoleWithFileLogger)
      break
    }
    default: {
      throw new Error('not found logger')
    }
  }
}
