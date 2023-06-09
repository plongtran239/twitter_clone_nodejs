import express, { NextFunction, Request, Response } from 'express'

// Route handlers
import usersRouter from './routes/users.routes'

// Services
import databaseService from './services/database.services'

const PORT = 4000

const app = express()

// convert inputs to json
app.use(express.json())

app.use('/users', usersRouter)

databaseService.connect().catch(console.dir)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error', err)
  res.status(400).json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
