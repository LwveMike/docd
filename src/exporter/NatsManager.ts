import { connect, StringCodec } from "nats"
import type { NatsConnection, Subscription } from 'nats'

export class NatsManager {
  private _connection: NatsConnection
  private _subscriptions: Subscription[] = []
  
  static stringCodec = StringCodec()
  
  public async start () {
   this._connection = await connect({ servers: "127.0.0.1:4222" });
  }

  public async stop () {
    this._connection.close()
  }

  public async addSubscription (subject: string) {
    const subscription = this._connection.subscribe(subject)
    this._subscriptions.push(subscription)

    console.log(`listening for ${subscription.getSubject()} requests...`);

    for await (const _m of subscription) {
      console.log('handle')
    }
  }
}
