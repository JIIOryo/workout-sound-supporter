import {Container} from 'inversify'

import {Interface, Impl} from '@/handler'
import * as di from '@/di'

/**
 * Handler Injection
 * @param container DI Container
 */
export const inject = (container: Container): void => {
  container.bind<Interface.IHandler>(di.Identifier.Handler.Workout.GetMenus).to(Impl.Workout.GetWorkoutMenusHandler)
}
