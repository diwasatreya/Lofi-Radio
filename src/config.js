require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || '', // your discord bot token
  prefix: process.env.PREFIX || '.', // bot prefix
  ownerID: process.env.OWNERID?.split(',') || ['519666024220721152','965503342249914408'], //your discord id
  SpotifyID: process.env.SPOTIFYID || '38eb449803a24a5fbb4fecdeff237b90', // spotify client id
  SpotifySecret: process.env.SPOTIFYSECRET || '08dab901c92f4ad296a7156b68f5e048', // spotify client secret
  mongourl: process.env.MONGO_URI || 'mongodb+srv://diwasatreya:radio@radio.hwvpd28.mongodb.net/', // MongoDb URL
  embedColor: process.env.COlOR || '#DDBD86', // embed colour
  logs: process.env.LOGS || '', // Discord channel id 
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
