import {Container} from 'inversify'

import * as domain from '@/domain'
import * as di from '@/di'

/**
 * Domain Injection
 * @param container DI Container
 */
export const inject = (container: Container): void => {
  container.bind<domain.WorkoutDomain>(di.Identifier.Domain.Workout).to(domain.WorkoutDomain)
}
