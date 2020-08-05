import mongoose, { Schema, Document } from 'mongoose'
import SchemaGeneral, { ISchemaGeneral } from './SchemaGeneral'

const bcrypt = require('bcrypt')

export interface ICuenta extends Document {
  id: string
  rol: string
  activo: boolean
  clave: string
  numeroIdentidad: string
  correo: string
  primerNombre: string
  primerApellido: string
  __m: ISchemaGeneral
  codificarClave (clave: string): string
  compararClave (clave: string, hash: string): boolean
}

const CuentaSchema: Schema = new Schema({
  id: {
    type: String,
    unique: true,
    index: true
  },
  // FKs
  // Schema
  rol: {
    type: String,
    enum: ['USUARIO', 'ADMINISTRADOR'],
    default: 'USUARIO'
  },
  activo: {
    type: Boolean,
    default: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  clave: {
    type: String,
    required: true,
    trim: true
  },
  numeroIdentidad: {
    type: String,
    trim: true
  },
  primerNombre: {
    type: String,
    required: true,
    trim: true
  },
  primerApellido: {
    type: String,
    required: true,
    trim: true
  },
  __m: {
    ...SchemaGeneral
  }
}, {
  collection: 'auth_cuentas',
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  versionKey: false
})

CuentaSchema.method('codificarClave', function (clave: string): string {
  return bcrypt.hashSync(clave, bcrypt.genSaltSync(11))
})

CuentaSchema.method('compararClave', function (clave: string, hash: string): boolean {
  return bcrypt.compareSync(clave, hash)
})

CuentaSchema.virtual('nombreCompleto').get(function (this: ICuenta): string {
  return `${this.primerNombre} ${this.primerApellido}`
})

export default mongoose.model<ICuenta>('Cuenta', CuentaSchema)
