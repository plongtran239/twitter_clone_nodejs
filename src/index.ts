import express, { NextFunction, Request, Response } from 'express'

// Route handlers
import usersRouter from './routes/users.routes'

// Middlewares
import defaultErrorHandler from './middlewares/error.middlewares'

// Services
import databaseService from './services/database.services'

const PORT = 4000

const app = express()

// convert inputs to json
app.use(express.json())

app.use('/users', usersRouter)

databaseService.connect().catch(console.dir)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
