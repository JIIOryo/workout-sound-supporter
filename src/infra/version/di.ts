import {Container} from 'inversify'

import * as di from '@/di'
import * as infra from '@/infra'
import {Config} from '@/types'

/**
 * version Injection
 * @param container DI Container
 */
export const inject = (container: Container): void => {
  // gitしかないので、gitをinject
  container.bind<infra.version.Interface.IVersion>(di.Identifier.Infra.Version).to(infra.version.Impl.GitVersion).inSingletonScope()
}
