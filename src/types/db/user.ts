import {Domain} from '@/types'

export type User = {
  /**
   * ユーザーID
   */
  id: Domain.User.UserId
  /**
   * ユーザー名
   */
  name: string
}
