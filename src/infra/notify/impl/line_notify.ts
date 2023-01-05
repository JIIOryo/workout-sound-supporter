import {injectable} from 'inversify'

import {CONSTANT, lib} from '@'
import * as infra from '@/infra'

@injectable()
export class LineNotify implements infra.notify.Interface.INotify {
  private readonly lineNotifyClient: lib.http.HttpClient

  constructor() {
    this.lineNotifyClient = new lib.http.HttpClient()
  }

  async message(text: string): Promise<void> {
    const url = CONSTANT.SYSTEM.LINE_NOTIFY_URL
    const LINE_NOTIFY_ACCESS_TOKEN = process.env.LINE_NOTIFY_ACCESS_TOKEN
    if (!LINE_NOTIFY_ACCESS_TOKEN) {
      throw new Error('LINE_NOTIFY_ACCESS_TOKEN is not set.')
    }
    const headers = {
      Authorization: `Bearer ${LINE_NOTIFY_ACCESS_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const data = `message=${text}`
    await this.lineNotifyClient.post(url, data, headers)
  }
}
