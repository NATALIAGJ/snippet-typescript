import { Request, Response } from 'express'
import moment from 'moment'

import ServerConfig from '../config/index'

// Schemas
import Cuenta from '../schemas/SchemaCuenta'
import Sesion from '../schemas/SchemaSesion'

const jwt = require('jsonwebtoken')
const uuid = require('uuid-base62')

/**
 * Inicio de sesion para el tipo de usuario administrador
 * Esta ruta logea un administrador.
 *
 * @method POST
 * @access ADMIN
 */
export async function inicioSesionAdmin (req: Request, res: Response, next: any): Promise<void> {
  try {
    const { correo, clave } = req.body
    // Validar si el usuario es email o nombre de usuario
    const usuarioQuery = { correo }

    const cuentaUsuario = await Cuenta.findOne(usuarioQuery)

    if (cuentaUsuario === null) {
      next({
        estado: 404,
        mensaje: 'El usuario solicitado no existe'
      })
    } else {
      if (!cuentaUsuario.compararClave(clave, cuentaUsuario.clave)) {
        next({
          mensaje: 'Las credenciales del usuario no coiciden',
          estado: 401
        })
      }
      // Crear tokens y registros de sesion
      const nuevaSesion = new Sesion({
        id: uuid.v4(),
        usuario: cuentaUsuario._id,
        activo: true,
        fechaCreacion: moment(),
        ultimaInteraccion: moment()
      })

      await nuevaSesion.save()

      const token = jwt.sign({
        id: nuevaSesion.id,
        uid: cuentaUsuario.id
      }, ServerConfig.jwtSecret)

      res.status(200).json({
        datos: cuentaUsuario.toJSON(),
        token
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}

/**
 * Crear Usuario nuevo
 * Esta función crea un nuevo usuario teniendo por medio de una petición POST.
 * Solo los usuarios con rol administrador pueden crear un nuevo usuario.
 *
 * @method POST
 * @access ADMIN
 */
export async function crearUsuario (req: Request, res: Response, next: any): Promise<any> {
  try {
    const { body } = req

    // 1.0: Crear nueva cuenta
    const cuenta = new Cuenta({
      ...body,
      id: uuid.v4(),
      rol: body.rol,
      activo: true,
      __m: {
        fechaCreado: moment().toDate()
      }
    })

    // 1.1: Encriptar clave via bcrypt
    cuenta.clave = cuenta.codificarClave(body.clave)

    // 1.2 Almacenar el nuevo usuario en MongoDB.
    await cuenta.save()

    // 2.0: Crear la nueva sesion
    const nuevaSesion = new Sesion({
      id: uuid.v4(),
      usuario: cuenta._id,
      activo: true,
      fechaCreacion: moment(),
      ultimaInteraccion: moment()
    })

    // 2.1: Almacenar la nueva sesión
    await nuevaSesion.save()

    // 3.0: Codificar un nuevo JWT Token
    const token = jwt.sign({
      id: nuevaSesion.id,
      uid: cuenta.id
    }, ServerConfig.jwtSecret)

    res.status(201).json({
      datos: cuenta.toJSON(),
      token
    })
  } catch (error) {
    if (error.code === 11000) {
      next({
        estado: 401,
        mensaje: 'El usuario ya se encuentra registrado en la base de datos. Por favor revise los datos'
      })
    } else {
      next({ estado: 500, original: error })
    }
  }
}

/**
 * Cerrar Sesión en la cuenta
 * Aquí se busca una sesión y se actualiza en la base de datos
 * con el flag activo = false. Aquí no se borra la sesión.
 *
 * NOTA:
 * He dejado req: any. Dado que aun no tengo forma de validar
 * que sesion sea un derivado del type Request
 *
 * @method POST
 */
export async function cerrarSesion (req: any, res: Response, next: any): Promise<any> {
  try {
    const { sesion } = req
    const sesionActual = await Sesion.findOne({ _id: sesion._id })

    if (sesionActual) {
      sesionActual.activo = false
      sesionActual.ultimaInteraccion = moment().toDate()
      await sesionActual.save()

      res.status(201).json({
        mensaje: 'La sesión ha sido cerrada correctamente'
      })
    } else {
      next({
        estado: 404,
        mensaje: 'La sesión actual no está disponible'
      })
    }
  } catch (error) {
    next({ estado: 500, original: error })
  }
}
