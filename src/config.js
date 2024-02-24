require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || 'MTE4NDA4NzUzNzQ4OTI4NTE2MA.GteqDy.lepadCwGqCEhHnvarG4_vIypC7Gxi_m9DUcwYc', 
  prefix: process.env.PREFIX || '.', 
  ownerID: process.env.OWNERID?.split(',') || ['761635564835045387','761635564835045387'], 
  SpotifyID: process.env.SPOTIFYID || 'ecbc88f9465a44b89ed9c0f7225375ad', 
  SpotifySecret: process.env.SPOTIFYSECRET || '6851efbd13c0427b9ecd1fcaf4d97046', 
  mongourl: process.env.MONGO_URI || 'mongodb+srv://Nightfury:qutypie@cluster0.neehxqo.mongodb.net/?retryWrites=true&w=majority', 
  embedColor: process.env.COlOR || '#CF5BDF', // 
  logs: process.env.LOGS || '1151894056482381844', 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/CdCfgSC3qy',
    invite: process.env.INVITE || 'https://discord.gg/CdCfgSC3qy',
    vote: process.env.VOTE || 'https://top.gg/bot/1044596050859663401/vote',
    bg: process.env.BG || 'https://cdn.discordapp.com/avatars/1184087537489285160/d5f0baddb9a75554bb711f1eda3cadd9.png?size=2048'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lava.link',
      name: process.env.NODE_NAME || 'Main',
      auth: process.env.NODE_AUTH || 'anything as a password',
      secure: parseBoolean(process.env.NODE_SECURE || 'false'),
    },
  ],
};

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
