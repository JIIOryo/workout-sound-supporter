import {Container} from 'inversify'

import {CONSTANT} from '@'
import {Interface, Impl} from '@/repository'
import {Config} from '@/types'
import * as di from '@/di'

/**
 * Repository Injection
 * @param container DI Container
 * @param dbConfig DB Config
 */
export const inject = (container: Container, dbConfig: Config['db']): void => {
  switch (dbConfig.type) {
    case CONSTANT.SYSTEM.DB_TYPE.JSON: {
      container.bind<Interface.IWorkoutHistoryRepository>(di.Identifier.Repository.WorkoutHistory).to(Impl.WorkoutHistoryJsonFileRepository)
      break
    }
    default: {
      throw new Error('not found repository')
    }
  }
}
