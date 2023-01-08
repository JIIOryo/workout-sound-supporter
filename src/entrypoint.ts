import 'reflect-metadata'
import 'source-map-support/register'

import {logger, server, version} from '@'

const main = async () => {
  await server.setup()
  await server.start()

  const thisAppVersion = await version.get()

  logger.info(`workout sound supporter started! (version: ${thisAppVersion})`)
}

main()
