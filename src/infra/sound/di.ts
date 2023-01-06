import {Container} from 'inversify'

import * as di from '@/di'
import * as infra from '@/infra'
import {Config} from '@/types'

/**
 * Sound Injection
 * @param container DI Container
 * @param soundConfig Sound Config
 */
export const inject = (container: Container, soundConfig: Config['sound']): void => {
  // PythonScriptが有効な場合
  if (soundConfig.pythonScript.enabled) {
    container.bind<infra.sound.Interface.ISound>(di.Identifier.Infra.Sound).to(infra.sound.Impl.PythonScript).inSingletonScope()
    return
  }

  // それ以外の場合
  throw new Error('not found sound config')
}
