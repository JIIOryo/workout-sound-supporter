import {Container} from 'inversify'

import {Interface, Impl} from '@/handler'
import * as di from '@/di'

/**
 * Handler Injection
 * @param container DI Container
 */
export const inject = (container: Container): void => {
  container.bind<Impl.WorkoutHandler>(di.Identifier.Handler.Workout).to(Impl.WorkoutHandler)
  // container.bind<Impl.RunHandler>(di.Identifier.Handler.Run).to(Impl.RunHandler)
  // container.bind<Impl.MealHandler>(di.Identifier.Handler.Meal).to(Impl.MealHandler)
}
