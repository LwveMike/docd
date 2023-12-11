import puppeteer from 'puppeteer-core'
import { ManagerImpl } from './Manager'
// import { NatsManager } from './NatsManager';

;(async () => {
  const manager = new ManagerImpl(puppeteer)

  await manager.createBrowser()

  await manager.loadPage()
})()

// ;(async () => {
//   const natsManager = new NatsManager()

//   await natsManager.start()

//   natsManager.addSubscription('time')
// })()
