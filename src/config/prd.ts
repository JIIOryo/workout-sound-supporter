import {CONSTANT} from '@'
import {Config} from '@/types'

export const prd: Config = {
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
  }
}
