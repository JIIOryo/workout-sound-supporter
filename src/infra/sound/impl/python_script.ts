import * as childProcess from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

import {injectable, inject} from 'inversify'

import * as infra from '@/infra'
import * as di from '@/di'
import * as sound from '@/infra/sound'
import {util} from '@'
import {Domain, Util, Config} from '@/types'

/**
 * Pythonのscriptに渡すJSON文字列のオブジェクトの型
 */
type PythonScriptMenuArg = {
  /**
   * サウンドの間隔(sec)
   * @example 1
   */
   intervalSec: Util.Number.Seconds
   /**
    * 1セットにサウンドが鳴る回数
    * @example 25
    */
   soundCount: number
   /**
    * セット数
    * @example 3
    */
   setCount: number
   /**
    * unitの終了後の休憩時間(sec)
    * @example 60
    */
   restSec: Util.Number.Seconds
}[]

/**
 * サウンド再生の終了ステータス
 */
type SoundPlayStatus = infra.sound.Interface.SoundPlayStatus

/**
 * Pythonのsoundのスクリプトを実行する
 */
@injectable()
export class PythonScript implements infra.sound.Interface.ISound {
  /**
   * 実行するpythonコマンド
   */
  private readonly PYTHON_BIN: string

  /**
   * 実行するpythonスクリプトのパス
   */
  private readonly PYTHON_SCRIPT_PATH: string

  /**
   * RaspberryPiのGPIOのpin番号
   */
  private readonly RASPBERY_PI_GPIO_PIN: number

  /**
   * pythonスクリプトのpidファイルのパス
   */
  private readonly PID_FILE_PATH = path.join(util.projectBasePath, 'tmp', 'python_sound_script.pid')

  constructor(
    @inject(di.Identifier.Config) private readonly config: Config,
    @inject(di.Identifier.Infra.Logger) private readonly logger: infra.logger.Interface.ILogger,
  ) {
    if (!this.config.sound.pythonScript.enabled) {
      throw new Error('PythonScript is disabled')
    }

    this.PYTHON_BIN = this.config.sound.pythonScript.command
    this.PYTHON_SCRIPT_PATH = path.join(util.projectBasePath, this.config.sound.pythonScript.scriptPath)
    this.RASPBERY_PI_GPIO_PIN = this.config.sound.pythonScript.raspberryPi.pin
  }

  /**
   * PIDファイルを作成する
   */
  private _createPidFile(pid: Util.Pid): void {
    fs.writeFileSync(this.PID_FILE_PATH, pid.toString())
  }

  /**
   * PIDファイルを削除する
   */
  private _removePidFile(): void {
    // PIDファイルが残っていない場合は何もしない
    if (!this._existPidFile()) {
      return
    }
    fs.unlinkSync(this.PID_FILE_PATH)

  }

  /**
   * PIDファイルが残っているかどうか
   * 残っている場合は以下のいずれか
   *
   * - 強制終了をした
   * - すでに実行している場合であるかどうか
   * @returns 強制終了をしたorすでに実行している場合である: true
   */
  private _existPidFile(): boolean {
    return fs.existsSync(this.PID_FILE_PATH)
  }

  /**
   * プロセスの初期化
   */
  private async _initProcess(): Promise<void> {
    // PIDファイルが残っていない場合は何もしない
    if (!this._existPidFile()) {
      return
    }

    // PIDファイルが残っており、プロセスが実行中 or 強制終了した場合 のいずれかである場合は、プロセスを強制終了し、PIDファイルを削除する
    const pid = fs.readFileSync(this.PID_FILE_PATH, 'utf-8')
    this.logger.warn(`python script is already running. pid: ${pid}`)

    // プロセスを強制終了する
    await new Promise((resolve) => {
      childProcess.exec(`kill -9 ${pid}`, (err, stdout, stderr) => {
        if (err) {
          // プロセスが存在しない場合はエラーになるが、無視する
          this.logger.warn(err)
          resolve(null)
        }
        this.logger.warn(`process killed. pid: ${pid}`)
        resolve(null)
      })
    })

    // PIDファイルを削除する
    this._removePidFile()
  }

  async play(units: Domain.Workout.WorkoutMenuUnit[]): Promise<SoundPlayStatus> {

    // プロセスの初期化処理
    await this._initProcess()

    const arg: PythonScriptMenuArg = units.map((unit) => ({
      intervalSec: unit.intervalSec,
      soundCount: unit.soundCount,
      setCount: unit.setCount,
      restSec: unit.restSec,
    }))
    const jsonArg = JSON.stringify(arg)
    /** 実行するpythonのコマンド */
    const command = `SOUND_PIN=${this.RASPBERY_PI_GPIO_PIN} ${this.PYTHON_BIN} ${this.PYTHON_SCRIPT_PATH} '${jsonArg}'`

    // pythonのscriptを実行する
    const result = await new Promise<SoundPlayStatus>((resolve, reject) => {
      const cp = childProcess.exec(command, {shell: 'bash'}, (err, stdout, stderr) => {
        if (err) {
          // killされた場合
          if (cp.signalCode === 'SIGKILL') {
            resolve({
              status: sound.SOUND_PLAY_STATUS.STOP,
            })
            return
          }

          this.logger.error(err)
          resolve({
            status: sound.SOUND_PLAY_STATUS.FAILURE,
            message: err.message,
          })
        }

        this.logger.info(`stdout: \n${stdout}`)

        // 正常終了した場合はPIDファイルを削除する
        this._removePidFile()

        resolve({
          status: sound.SOUND_PLAY_STATUS.SUCCESS,
        })
      })

      // PIDが存在しない場合は終了
      if (!cp.pid) {
        resolve({
          status: sound.SOUND_PLAY_STATUS.FAILURE,
          message: 'PID is not found',
        })
        return
      }

      // PIDファイルを作成する
      this._createPidFile(cp.pid)
    })

    return result
  }

  async stop(): Promise<void> {
    this._initProcess()
  }
}
