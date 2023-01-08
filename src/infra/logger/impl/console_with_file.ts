import * as fs from 'fs'
import * as path from 'path'

import {injectable} from 'inversify'

import {lib, util} from '@'
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
export class ConsoleWithFileLogger implements infra.logger.Interface.ILogger {
  /**
   * ログファイルのパスを取得する
   * @returns ログファイルのパス
   */
  private getLogFilePath = (): string => {
    return `${path.join(util.projectBasePath, 'log')}/${lib.date.format(Date.now(), 'YYYY_MM_DD')}.log`
  }

  /**
   * タイムスタンプを生成する
   * @returns タイムスタンプ文字列
   */
  private generateTimestamp = (): string => {
   return lib.date.format(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSS')
  }

  public debug(...args: any[]): void {
    // ファイル出力
    const fileText = `debug ${this.generateTimestamp()}: ${args.join(' ')}`
    fs.appendFileSync(this.getLogFilePath(), fileText + '\n')

    console.debug(`${COLOR.BLUE}debug ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }

  public info(...args: any[]): void {
    // ファイル出力
    const fileText = `info ${this.generateTimestamp()}: ${args.join(' ')}`
    fs.appendFileSync(this.getLogFilePath(), fileText + '\n')

    console.info(`${COLOR.GREEN}info ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }

  public warn(...args: any[]): void {
    // ファイル出力
    const fileText = `warn ${this.generateTimestamp()}: ${args.join(' ')}`
    fs.appendFileSync(this.getLogFilePath(), fileText + '\n')

    console.warn(`${COLOR.YELLOW}warn ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }

  public error(...args: any[]): void {
    // ファイル出力
    const fileText = `error ${this.generateTimestamp()}: ${args.join(' ')}`
    fs.appendFileSync(this.getLogFilePath(), fileText + '\n')

    console.error(`${COLOR.RED}error ${COLOR.CYAN}${this.generateTimestamp()}${COLOR.RESET}:`, ...args)
  }
}
