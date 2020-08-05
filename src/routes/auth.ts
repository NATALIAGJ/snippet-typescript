import express from 'express'

import {
  inicioSesionAdmin,
  crearUsuario,
  cerrarSesion
} from '../controllers/ControllerJwtAuth'

import PrivateMiddleware from '../middlewares/JwtMiddleware'

const AuthRouter = express.Router()

AuthRouter.post('/login', inicioSesionAdmin)

AuthRouter.post('/registro', crearUsuario)

AuthRouter.delete('/cerrar_sesion', [
  PrivateMiddleware
], cerrarSesion)

export default AuthRouter