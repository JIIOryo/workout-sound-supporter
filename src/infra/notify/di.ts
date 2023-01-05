import {Container} from 'inversify'

import * as di from '@/di'
import * as infra from '@/infra'
import {Config} from '@/types'

/**
 * Notification Injection
 * @param container DI Container
 * @param notificationConfig Notification Config
 */
export const inject = (container: Container, notificationConfig: Config['notification']): void => {
  // 通知を送信しない場合
  if (!notificationConfig.enabled) {
    container.bind<infra.notify.Interface.INotify>(di.Identifier.Infra.Notify).to(infra.notify.Impl.EmptyNotify)
    return
  }

  // LINE Notifyが有効の場合
  if (notificationConfig.enabled && notificationConfig.lineNotify.enabled) {
    container.bind<infra.notify.Interface.INotify>(di.Identifier.Infra.Notify).to(infra.notify.Impl.LineNotify)
    return
  }

  // それ以外の場合
  throw new Error('not found notification config')
}
