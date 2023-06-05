import { Router } from 'express'

// Middlewares
import { loginValidator } from '~/middlewares/users.middlewares'

// Controllers
import { loginController, registerController } from '~/controllers/users.controllers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerController)

export default usersRouter
