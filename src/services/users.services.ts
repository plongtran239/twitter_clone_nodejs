import User from '~/models/schemas/user.schema'
import databaseService from './database.services'

class UsersService {
  async register(payload: { email: string; password: string }) {
    const { email, password } = payload
    try {
      const result = await databaseService.users.insertOne(new User({ email, password }))
      return result
    } catch (error) {
      return error
    }
  }
}

const usersService = new UsersService()
export default usersService
