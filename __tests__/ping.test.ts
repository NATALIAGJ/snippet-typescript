import supertest from 'supertest'
import app from '../src/app'

/**
 * Probar endpoint de testing.
 */
describe('Probando API Básico', () => {
  it('El API está encendido y da respuesta', async (done) => {
    const response = await supertest(app).get('/ping')
    expect(response.status).toBe(200)
    expect(response.body.version).toBe('v1')
    done()
  })
})
