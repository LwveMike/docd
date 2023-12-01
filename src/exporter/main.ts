import puppeteer from 'puppeteer-core'
import { ManagerImpl } from './Manager'

;(async () => {
  const manager = new ManagerImpl(puppeteer)

  await manager.createBrowser()

  await manager.loadPage()
})()
