import {injectable} from 'inversify'

import * as handler from '@/handler'
import * as server from '@/server'

@injectable()
export class GetWorkoutMenusHandler implements handler.Interface.IHandler {
  public async exec(
    req: server.Request.Interface.IRequest,
    res: server.Response.Interface.IResponse,
  ): Promise<void> {
    res.send({
      menus: [
        {
          id: 1,
          name: 'test',
        },
      ],
    })
  }
}
