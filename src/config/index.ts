import dotenv from 'dotenv'

dotenv.config();

export interface IServerConfig {
  port: number | string
  bodyRequestLimit: string
  jwtSecret: string
  uploadDir: string
}

export interface IMongoDBConfig {
  auth: boolean
  host: string
  db: string
  port: number | string
  username?: string | null
  password?: string | null
}


export interface IJSReportConfig {
  host: string,
  user: string,
  pass: string
}

export interface IGoogleGCP {
  projectId: string | undefined
  keyFilename: string
}

/**
 * NOTA:
 * Imprementacion de una clase de configuración.
 */
export class ServerConfig implements IServerConfig {
  port: number | string
  bodyRequestLimit: string
  jwtSecret: string
  uploadDir: string
  mongodb: IMongoDBConfig

  constructor () {
    this.port = process.env.APP_PORT || 3000
    this.bodyRequestLimit = process.env.APP_BODY_REQUEST_LIMIT || '500mb'
    this.jwtSecret = process.env.APP_JWT_SECRET || 'SECRET'
    this.uploadDir = process.env.UPLOAD_DIR || '/tmp/servicios/app'

    // Configurar MongoDB
    this.mongodb = {
      auth: Boolean(process.env.MONGO_DB_AUTH_FLAG || false),
      host: process.env.MONGO_DB_HOST || 'localhost',
      port: process.env.MONGO_DB_PORT || 27017,
      db: process.env.MONGO_DB_NAME || 'snippet',
      username: process.env.MONGO_DB_USER || null,
      password: process.env.MONGO_DB_PASS || null
    }

  }
}

export default new ServerConfig()
