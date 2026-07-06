import { activeBaseUrl } from './environmentConfig'

export default {
  URL: activeBaseUrl,
  USERNAME: process.env.USERNAME ?? '',
}