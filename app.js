import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import filesRoute from './routes/files.routes.js'

const app = express()

app.use(filesRoute);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Metromedics Api.' })
})


export default app