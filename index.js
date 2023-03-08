const { Constants, GatewayIntentBits, mergeDefault } = require('discord.js');
const { Indomitable } = require('indomitable');
const { token , clusterCount, shardCount } = require('./config.json');
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
    clusterCount,
    shardCount,
    client: YamakazeClient,
    autoRestart: true,
    token
};

const manager = new Indomitable(sharderOptions)
    .on('error', console.error)
    .on('debug', message => console.log(`[Indomitable] [Main] ${message}`));

manager.spawn();
