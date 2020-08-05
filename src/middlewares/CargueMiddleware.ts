import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import multer from 'multer'
import mime from 'mime'
import shelljs from 'shelljs'
import ServerConfig from '../config'

const uuid = require('uuid-base62')

export interface CargarMiddlewareConfig {
  nombreCampo: string
  cantidad: number
  limiteArchivo: number
}

export default function (config: CargarMiddlewareConfig) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Crear el directorio
    const dir = `${ServerConfig.uploadDir}/${req.sesion.usuario.id}`
    shelljs.mkdir('-p', dir)

    const handler = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, dir)
        },
        filename: (req, file, cb) => {
          cb(null, `${uuid.v4()}.${mime.getExtension(file.mimetype)}`)
        }
      }),
      limits: {
        fileSize: config.limiteArchivo
      }
    }).array(config.nombreCampo, config.cantidad)

    handler(req, res, (error: any) => {
      if (error) {
        next({ estado: 500, original: error })
      } else {
        next()
      }
    })
  }
}
