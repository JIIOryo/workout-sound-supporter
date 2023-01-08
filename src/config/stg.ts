import {CONSTANT} from '@'
import {Config} from '@/types'

export const stg: Config = {
  db: {
    type: CONSTANT.SYSTEM.DB_TYPE.JSON,
  },
  logger: {
    type: CONSTANT.SYSTEM.LOGGER_TYPE.CONSOLE,
  },
  server: {
    express: {
      enabled: true,
      port: 5000,
    },
  },
  notification: {
    enabled: true,
    lineNotify: {
      enabled: true,
    },
  },
  sound: {
    pythonScript: {
      enabled: true,
      scriptPath: 'script/python/sound.py',
      command: process.env.PYTHON_COMMAND || 'python3',
      raspberryPi: {
        pin: Number(process.env.SOUND_PIN) || 21,
      },
    },
  }
}
