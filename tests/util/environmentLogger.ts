import { TestInfo } from '@playwright/test'
import { activeEnvironment, activeBaseUrl } from './environmentConfig'

export function logExecutionContext(testInfo: TestInfo): void {
  console.info(`[AUTOMATION][ENV] ${activeEnvironment} | URL=${activeBaseUrl}`)
  console.info(`[AUTOMATION][TEST] ${testInfo.title}`)
}
