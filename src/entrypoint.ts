import 'reflect-metadata'
import 'source-map-support/register'

import {logger, server} from '@'

const main = async () => {
  await server.setup()
  await server.start()

  logger.info('workout sound supporter started!')
}

main()
