const Client = require('./src/structures/Client');
const config = require('./config.json');

const client = new Client({
  intents: [
      'GUILDS',
      'GUILD_MESSAGE_REACTIONS',
      'GUILD_MESSAGES',
      'GUILD_INVITES',
      'GUILD_VOICE_STATES',
      'GUILD_MEMBERS',
      'GUILD_PRESENCES'
  ]
})

client.login(config.token)