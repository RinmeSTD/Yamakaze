const { Constants, GatewayIntentBits, mergeDefault } = require('discord.js');
const { Indomitable } = require('indomitable');
const { token } = require('./config.json');
const { GUILDS, GUILD_MEMBERS, GUILD_BANS, GUILD_VOICE_STATES, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS } = GatewayIntentBits;
const YamakazeClient = require('./src/Yamakaze.js');

// cache settings on client file
const customClientOptions = {
    disableMentions: 'everyone',
    restRequestTimeout: 30000,
    intents: [ GUILDS, GUILD_MEMBERS, GUILD_BANS, GUILD_VOICE_STATES, GUILD_MESSAGES, GUILD_MESSAGE_REACTIONS ]
};

const sharderOptions = {
    clientOptions: mergeDefault(Constants.DefaultOptions, customClientOptions),
    clusterCount: 4,
    shardCount: 8,
    client: YamakazeClient,
    autoRestart: true,
    token
};

const manager = new Indomitable(sharderOptions)
    .on('error', console.error)
    .on('debug', message => console.log(`[Indomitable] [Main] ${message}`));

manager.spawn();
