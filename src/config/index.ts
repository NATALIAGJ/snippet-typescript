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
 * Esta no es la mejor implementación de una clase de configuración.
 * Ya que la idea es implementar un Factory para las configuraciones
 * de bases de datos. Pero lo vamos a dejar provisional.
 */
export class ServerConfig implements IServerConfig {
  port: number | string
  bodyRequestLimit: string
  jwtSecret: string
  uploadDir: string
  mongodb: IMongoDBConfig
  jsreport: IJSReportConfig
  gcp: IGoogleGCP
  // sendgrid: ISendgrid

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
      db: process.env.MONGO_DB_NAME || 'natuchify',
      username: process.env.MONGO_DB_USER || null,
      password: process.env.MONGO_DB_PASS || null
    }

    this.jsreport = {
      host: process.env.JSREPORT_HOST || 'localhost:5488',
      user: process.env.JSREPORT_USER || 'agente_dev',
      pass: process.env.JSREPORT_HOST || 'agente_dev'
    }

    this.gcp = {
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_DIR_KEY || 'keys/gcp.json'
    }
  }
}

export default new ServerConfig()
