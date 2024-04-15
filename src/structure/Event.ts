import { Yamakaze } from "../Yamakaze.js";

export abstract class Event {
    public readonly client: Yamakaze;
    public abstract readonly name: string; // name of this client event
    public abstract readonly once: boolean; // if this event should only fire once
    protected constructor(client: Yamakaze) {
        this.client = client;
    }

    abstract run(...args: unknown[]): Promise<void>;

    public handle(...args: unknown[]): void {
        this.run(...args).catch((error) => this.client.logger.error(error));
    }
}
