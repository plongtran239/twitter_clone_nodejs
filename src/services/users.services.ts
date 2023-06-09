import User from '~/models/schemas/user.schema'
import { RegisterReqBody } from '~/models/requests/user.request'

import databaseService from './database.services'

import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'

import { TokenType } from '~/constants/enums'

class UsersService {
  private signAccessToken(userId: string) {
    return signToken({
      payload: { userId, token_type: TokenType.AccessToken },
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
    })
  }

  private signRefreshToken(userId: string) {
    return signToken({
      payload: { userId, token_type: TokenType.RefreshToken },
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN }
    })
  }

  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )

    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])

    return {
      access_token,
      refresh_token
    }
  }

  async checkExistEmail(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
}

const usersService = new UsersService()
export default usersService
