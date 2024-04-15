import { Event } from '../structure/Event.js';
import { Yamakaze } from '../Yamakaze.js';

export default class Ready extends Event {
    public readonly name: string;
    public readonly once: boolean;
    constructor(client: Yamakaze) {
        super(client);
        this.name = 'ready';
        this.once = true;
    }

    run(): Promise<void> {
        const guilds = this.client.guilds.cache.size;
        const users = this.client.users.cache.size;
        const channels = this.client.channels.cache.size;
        this.client.logger.info(`Cluster Loaded! [@${this.client.user!.tag}] in this cluster contains ${guilds} guild(s) | ${users} user(s) | ${channels} channel(s)`);
        return Promise.resolve(undefined);
    }
}
