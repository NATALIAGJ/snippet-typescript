import express from 'express'
import bodyParser from 'body-parser'
import { Application, Response, Request } from 'express'
import cors from 'cors'
import logger from 'morgan'

const swaggerUi = require('swagger-ui-express')

// Modules
import auth from './routes/auth'
import ejemplo from './routes/ejemplo'

const app: Application = express()

app.use(bodyParser.urlencoded({ extended: false, limit: '500mb' }))
app.use(bodyParser.json({ limit: '500mb' }))

/** Cors */
app.use(cors())
app.use(logger('dev'))

app.all(['/', '/v1', '/v1/ping', '/ping'], (req: Request, res: Response) => {
    res.status(200).json({
      name: 'Snippet',
      provider: 'hangar.js',
      version: 'v1'
    })
})

const swaggerDoc = require('../swagger.json')
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

// Enrutadores
app.use('/v1/ejemplos', ejemplo)
app.use('/v1/autenticacion', auth)

export default app