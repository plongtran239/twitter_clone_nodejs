import { Router } from 'express'

// Middlewares
import { loginValidator } from '~/middlewares/users.middlewares'

// Controllers
import { loginController } from '~/controllers/users.controllers'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)

export default usersRouter
