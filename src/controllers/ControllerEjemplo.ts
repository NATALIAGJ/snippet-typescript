import { Request, Response, NextFunction } from 'express'
import Ejemplo, { IEjemplo } from '../schemas/SchemaEjemplo'
import moment from 'moment'
import slug from 'slug'

const uuid = require('uuid-base62')

export async function listarEjemplos (req: Request, res: Response, next: NextFunction) {
  try {
    let { querymen } = req

    let ejemplos = await Ejemplo.find({ '__m.borrado': false }, querymen.select, querymen.cursor)
      .populate('tokens')

    res.status(200).json({
      ejemplos
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function crearEjemplo (req: Request, res: Response, next: NextFunction) {
  try {
    let { body } = req

    let nuevoEjemplo = new Ejemplo({
      ...body,
      id: uuid.v4(),
      slug: slug(body.nombre, { lower: true, replacement: '_' }),
      __m: {
        fechaCreado: moment()
      }
    })

    let guardado = await nuevoEjemplo.save()

    res.status(201).json({
      ejemplo: guardado
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function crearMultiplesEjemplos (req: Request, res: Response, next: NextFunction) {
  try {
    let { body } = req

    let ejemplos = body.lista.map((bodyEjemplo: IEjemplo) => {
      return new Ejemplo({
        ...bodyEjemplo,
        id: uuid.v4(),
        __m: {
          fechaCreado: moment()
        }
      })
    })

    await Ejemplo.create(ejemplos)

    let mensaje = ejemplos.length > 1
      ? `Se han creado ${ejemplos.length} ejemplos corectamente`
      : 'Se ha creado 1 conversación correctamente'

    res.status(201).json({
      mensaje
    })
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function editarEjemplo (req: Request, res: Response, next: NextFunction) {
  try {
    let { body, params } = req

    let ejemplo = await Ejemplo.findOne({
      id: params.ejemploId,
      '__m.borrado': false
    })

    if (ejemplo) {
      let actualizar = Object.assign(ejemplo, {
        ...body,
        id: ejemplo.id,
        __m: {
          ...ejemplo.__m,
          fechaActualizado: moment()
        }
      })

      await actualizar.save()

      res.status(201).json({
        ejemplo: actualizar
      })
    } else {
      res.status(404).json({
        mensaje: 'El conversación no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

export async function detalleEjemplo (req: Request, res: Response, next: NextFunction) {
  try {
    let { params, querymen } = req

    let ejemplo = await Ejemplo.findOne({
      id: params.ejemploId,
      '__m.borrado': false
    }, querymen.select)

    if (ejemplo) {
      res.status(201).json({
        ejemplo
      })
    } else {
      res.status(404).json({
        mensaje: 'El conversación no ha sido encontrado'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}
