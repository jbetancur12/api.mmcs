import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import routes from './routes/index.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())


app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Metromedics Api.' })
})


export default app