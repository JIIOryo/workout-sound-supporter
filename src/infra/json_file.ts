/**
 * @fileoverview JSONのファイルを読み書きするクライアント
 */
import * as fs from 'fs'
import * as path from 'path'

import {util} from '@'

export class JsonFileClient<T> {
  /**
   * 対象のファイルパス
   */
  private _filePath: string

  constructor(filePath: string) {
    this._filePath = path.join(util.projectBasePath, filePath)
  }

  /**
   * ファイルを読み込む
   * @returns ファイルの内容。ファイルが存在しない場合はnull
   */
  async read(): Promise<T | null> {
    const isExistFile = await this.isExist()
    if (!isExistFile) {
      return null
    }
    const file = await fs.promises.readFile(this._filePath, 'utf8')
    return JSON.parse(file)
  }

  /**
   * ファイルが存在するか判定
   * @returns ファイルが存在する: true, 存在しない: false
   */
  async isExist(): Promise<boolean> {
    try {
      await fs.promises.access(this._filePath)
      return true
    } catch (e) {
      return false
    }
  }

  /**
   * ファイルに書き込む
   * - 存在しない場合は作成する
   * @param data ファイルに書き込む内容
   */
  async write(data: T): Promise<void> {
    await fs.promises.writeFile(this._filePath, JSON.stringify(data, null, 2))
  }
}
