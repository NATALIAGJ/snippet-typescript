import ServerConfig, { IMongoDBConfig } from '../config'
import chalk from 'chalk'
import logger from './logger'
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.SERVER_PORT

const mongoose = require('mongoose')

/**
 * MongoDb
 * Types para la clase de Mongoose
 */

export class MongoDb implements IMongoDBConfig {
  auth: boolean = false
  host: string = 'localhost'
  db: string = 'test'
  port: number | string = 27017
  username?: string | null = null
  password?: string | null = null

  // tslint:disable-next-line: no-shadowed-variable
  constructor (credentials: IMongoDBConfig) {
    this.auth = credentials.auth
    this.host = credentials.host
    this.db = credentials.db
    this.port = credentials.port
    this.username = credentials.username || null
    this.password = credentials.password || null
  }

  public connect () {
    // Definir global.Promise como manejador de promesas en Mongoose
    mongoose.Promise = global.Promise

    // Detectar Evantos
    mongoose.connection.on('connected', () => {
      setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          logger.info(chalk.green('MONGODB [OK]\n'))
        }
      }, 400)
    })

    mongoose.connection.on('error', () => {
      logger.error(chalk.red('MONGODB [ERROR]\n'))
    })

    // Connectar
    if (this.auth) {
      logger.info(chalk.yellow(`MONGO: ${this.host}:${this.port}/${this.db}\n`))
      mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        user: this.username,
        pass: this.password,
        auth: {
          authDb: this.db
        }
      })
    } else {
      logger.info(chalk.yellow(`MONGO: ${this.host}:${this.port}/${this.db}\n`))
      mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
    }

    return mongoose
  }
}

const credentials = process.env.NODE_ENV === 'production'
  ? ServerConfig.mongodb
  : ServerConfig.mongodb

export default new MongoDb(credentials)
