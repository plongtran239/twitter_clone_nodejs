import express from 'express'

// Route handlers
import usersRouter from './routes/users.routes'

const PORT = 4000

const app = express()

// convert inputs to json
app.use(express.json())

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
