import {CONSTANT} from '@'
import {System, Util} from '@/types'

/** serverのexpressを利用する場合の設定 */
type ServerExpressEnabledTrue = {
  /** 利用するかどうか */
  enabled: true
  /** サーバーのport番号 */
  port: Util.Port
}
/** serverのexpressを利用しない場合の設定 */
type ServerExpressEnabledFalse = {
  /** 利用するかどうか */
  enabled: false
}
/** serverのexpressの設定 */
export type ServerExpress =
  | ServerExpressEnabledTrue
  | ServerExpressEnabledFalse


/**
 * 通知タイプ
 */
export type NotificationType = Util.ValueOf<typeof CONSTANT.SYSTEM.NOTIFICATION_TYPE>

/**
* 通知送信先のLINE Notifyが有効の場合の設定
*/
export type NotificationLineNotifyConfigEnabledTrue = {
  /**
  * 有効
  */
  enabled: true
}
/**
* 通知送信先のLINE Notifyが無効の場合の設定
*/
export type NotificationLineNotifyConfigEnabledFalse = {
  /**
  * 無効
  */
  enabled: false
}

/**
* LineNotifyの送信先の設定
*/
export type NotificationLineNotifyConfig =
  | NotificationLineNotifyConfigEnabledTrue
  | NotificationLineNotifyConfigEnabledFalse

/**
* ユーザーの実行通知送信先の無効な場合の設定
*/
type NotificationConfigEnabledFalse = {
  /**
  * 通知を送信しない
  */
  enabled: false
}
/**
* ユーザーの実行通知送信先の有効な場合の設定
*/
type NotificationConfigEnabledTrue = {
  /**
  * 通知を送信する
  */
  enabled: true
  /**
  * Line Notifyの場合の設定
  */
  lineNotify: NotificationLineNotifyConfig
}

/**
* ユーザーの実行通知送信先の設定
*/
export type NotificationConfig =
  | NotificationConfigEnabledFalse
  | NotificationConfigEnabledTrue

/**
 * サウンドの実行にpythonのスクリプトを利用する場合の設定
 */
export type SoundConfigPythonScriptEnabledTrue = {
  /** 利用する */
  enabled: true
  /**
   * pythonのスクリプトのパス
   * - リポジトリのルートからのパス
   */
  scriptPath: string
  /**
   * pythonの実行コマンド
   * @example 'python', 'python3'
   */
  command: string
  /**
   * ラズパイの設定
   */
  raspberryPi: {
    /**
     * GPIOのピン番号
     */
    pin: number
  }
}
/**
 * サウンドの実行にpythonのスクリプトを利用しない場合の設定
 */
export type SoundConfigPythonScriptEnabledFalse = {
  /** 利用しない */
  enabled: false
}

/**
 * サウンドの実行にpythonのスクリプトを利用するかどうかの設定
 */
export type SoundConfigPythonScript =
  | SoundConfigPythonScriptEnabledTrue
  | SoundConfigPythonScriptEnabledFalse

/**
 * Configの型
 */
export type Config = {
  /** DBの設定 */
  db: {
    /** 使用するDBのタイプ */
    type: System.DbType
  }
  /** loggerの設定 */
  logger: {
    /** 使用するloggerのタイプ */
    type: System.LoggerType
  }
  /** serverの設定 */
  server: {
    /** expressの設定 */
    express: ServerExpress
  }
  /** 通知設定 */
  notification: NotificationConfig
  /** サウンドの設定 */
  sound: {
    /** pythonのスクリプトで実行する */
    pythonScript: SoundConfigPythonScript
  }
}
