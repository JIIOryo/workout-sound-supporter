import {inject} from 'inversify'
import * as di from '@/di'
import * as infra from '@/infra'

/**
 * 通知を送信しない場合
 */
export class EmptyNotify implements infra.notify.Interface.INotify {
  constructor(
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger
  ) {}

  async message(text: string): Promise<void> {
    this.logger.info('EmptyNotify.message', {text})
    return
  }
}
