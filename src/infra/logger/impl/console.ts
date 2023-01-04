import {injectable} from 'inversify'

import * as infra from '@/infra'

/**
 * シンプルなconsoleのロガー
 */
@injectable()
export class ConsoleLogger implements infra.logger.Interface.ILogger {
  public debug(...args: any[]): void {
    console.debug(...args)
  }
  public info(...args: any[]): void {
    console.info(...args)
  }
  public warn(...args: any[]): void {
    console.warn(...args)
  }
  public error(...args: any[]): void {
    console.error(...args)
  }
}
