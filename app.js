import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import authRoute from './routes/auth.routes.js'
import certificateTypesRoute from './routes/certificateTypes.routes.js'
import devicesRoute from './routes/devices.routes.js'
import filesRoute from './routes/files.routes.js'
import usersRoute from './routes/users.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())


app.use(filesRoute);
app.use(usersRoute);
app.use(authRoute);
app.use(devicesRoute);
app.use(certificateTypesRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Metromedics Api.' })
})


export default app