import path from 'path'
import dotenv from 'dotenv'

const requestedEnvironment = (process.env.ENV || process.env.NODE_ENV || 'qa').toLowerCase()
const environmentFile = path.resolve(process.cwd(), `.env.${requestedEnvironment}`)

dotenv.config()
dotenv.config({ path: environmentFile })

export const activeEnvironment = requestedEnvironment
export const activeBaseUrl = process.env.URL || 'https://www.saucedemo.com/'
