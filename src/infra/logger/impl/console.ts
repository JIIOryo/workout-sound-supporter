import {injectable} from 'inversify'

import {lib} from '@'
import * as infra from '@/infra'

const COLOR = {
  RESET: '\x1b[0m',
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  CYAN: '\x1b[36m',
}

/**
 * シンプルなconsoleのロガー
 */
@injectable()
export class ConsoleLogger implements infra.logger.Interface.ILogger {
  /**
   * タイムスタンプを生成する
   * @returns タイムスタンプ文字列
   */
  private generateTimestamp = (): string => {
   return lib.date.format(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSS')
  }

  public debug(...args: any[]): void {
    console.debug(`${COLOR.BLUE}debug ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }
  public info(...args: any[]): void {
    console.info(`${COLOR.GREEN}info ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }
  public warn(...args: any[]): void {
    console.warn(`${COLOR.YELLOW}warn ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }
  public error(...args: any[]): void {
    console.error(`${COLOR.RED}error ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }
}
