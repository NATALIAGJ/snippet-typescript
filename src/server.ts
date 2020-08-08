import { Request, Response, NextFunction }  from 'express'

import chalk from 'chalk'
import MongoDb from './librerias/mongo'
import logger from './librerias/logger'
import app from './app'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config();

const port = process.env.APP_PORT

const figlet = require('figlet')
const server = http.createServer(app)

MongoDb.connect()

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.estado === 500) {
    logger.error(err.original)
    res.status(500).json({
      mensaje: 'Tenemos problemas con el servidor. Se ha creado una notificacion al área de soporte sobre este error. Gracias por tu paciencia'
    })
  } else {
    res.status(err.estado).json({
      mensaje: err.mensaje
    })
  }
})

app.use((req: Request, res: Response) => {
  console.log(1,req.path);
  
  res.status(404).json({
    mensaje: 'El recurso solicitado no ha sido encontrado',
    codigo: 'general'
  })
})

server.listen(port, () => {
  figlet('SNIPPET - API', (err: any, figletText: any) => {
    if (err) {
      throw err
    }
    process.stdout.write(chalk.yellow(figletText + '\n'))
    logger.info(`API is running on: ${port}`)
  })
})
