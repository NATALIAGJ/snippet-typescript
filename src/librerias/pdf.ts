import ServerConfig from '../config'

/**
 * TODO:
 * Hay que mejorar la implementación de tipos para JSReport Client
 */
// tslint:disable-next-line: no-var-requires
const Client = require('jsreport-client')(
  ServerConfig.jsreport.host,
  ServerConfig.jsreport.user,
  ServerConfig.jsreport.pass
)

export default Client
