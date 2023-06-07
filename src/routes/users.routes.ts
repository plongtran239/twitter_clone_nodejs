import { Router } from 'express'

// Middlewares
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

// Controllers
import { loginController, registerController } from '~/controllers/users.controllers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)

/**
 * Description: Register a new user
 * - path: /register
 * - method: POST
 * - body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 (ISOString)}
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
