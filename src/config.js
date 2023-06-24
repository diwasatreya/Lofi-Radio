require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', 
  prefix: process.env.PREFIX || '.', 
  ownerID: process.env.OWNERID?.split(',') || ['519666024220721152','965503342249914408'], 
  SpotifyID: process.env.SPOTIFYID || '', 
  SpotifySecret: process.env.SPOTIFYSECRET || '', 
  mongourl: process.env.MONGO_URI || '', 
  embedColor: process.env.COlOR || '#DDBD86', // 
  logs: process.env.LOGS || '', 
  links: {
    support: process.env.SUPPORT || 'https://discord.gg/aromax-development-708565122188312579',
    invite: process.env.INVITE || 'https://discord.gg/aromax-development-708565122188312579',
    vote: process.env.VOTE || 'https://discord.gg/aromax-development-708565122188312579',
    bg: process.env.BG || 'https://media.discordapp.net/attachments/966675680907657256/967789748699668480/flat-landscape-lake-sunset-deer-wallpaper-preview.jpg'
  },

  nodes: [
    {
      url: process.env.NODE_URL || 'lavalink.devamop.in:80',
      name: process.env.NODE_NAME || 'Main',
      auth: process.env.NODE_AUTH || 'DevamOP',
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
