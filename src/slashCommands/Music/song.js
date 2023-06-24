const { CommandInteraction, MessageButton, Client, MessageEmbed, Permissions, MessageActionRow } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');

const db = require("../../schema/playlist");
module.exports = {
  name: 'song',
  description: 'Show now playing song',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    const song = player.queue.current;
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }

    const emojimusic = client.emoji.music;

      
    
const np = new MessageEmbed()
  .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                    .setDescription(`
<:notes:1119915814733217843> **Playing Song:**
<:blank:1120331253569302619><:next:1119915811415539722> **${song.title}**`)

      .addFields([
        {
          name: `${player.queue.current.author}`,
          value: `<:sp:1121668243116019783> **[Spotify](${song.uri})**`,
          inline: true,
        },
        {
          name: `Developer`,
          value: `<:profile:1119915826326278265> **[Youtube](https://www.youtube.com/c/diwasatreya)**`,
          inline: true,
        },
      ])
      .setColor(client.embedColor);

  const sp = new MessageButton().setEmoji('1121668243116019783')
    .setURL(`${song.uri}`)
	.setStyle(`LINK`).setDisabled(false)
        const yt = new MessageButton()
      .setEmoji('1119915826326278265')
   .setURL(`https://www.youtube.com/c/diwasatreya`)
    .setStyle(`LINK`).setDisabled(false)
const b1 = new MessageButton().setCustomId(`like`).setEmoji(`1122029645135613953`).setStyle('SECONDARY').setDisabled(false)
        const b2 = new MessageButton().setCustomId(`down`).setEmoji(`1121856261122699385`).setStyle('SECONDARY').setDisabled(false)


    
  const roww = new MessageActionRow().addComponents(sp, yt, b1, b2);
    
    const m = await interaction.editReply({ embeds: [np], components: [roww] });



const filter = i => {
        if (i.user.id === interaction.user.id) return true;
        else {
          i.reply({
            ephemeral: true,
            content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      }

     const collector = m.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 30000 });

    collector.on('collect', async i => {
      if (!i.deferred) await i.deferUpdate();


 if (i.customId === `like`) {
const Name = "Favourite";
   const data = await db.find({ UserId: interaction.member.user.id, PlaylistName: Name });
     if (data.length <= 0) {
     const newData = new db({
      UserName: interaction.user.tag,
      UserId: interaction.user.id,
      PlaylistName: Name,
      CreatedOn: Math.round(Date.now() / 1000),
    });
    await newData.save();
    }

    let userData = db.find({
      UserId: interaction.user.id,
    });
    if (userData.length >= 10) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You Can Only Create 10 Playlist`),
        ],
      });
    }
  

    const song = player.queue.current;
    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    oldSong.push({
      title: song.title,
      uri: song.uri,
      author: song.author,
      duration: song.length,
    });
    await db.updateOne(
      {
        UserId: interaction.user.id,
        PlaylistName: Name,
      },
      {
        $push: {
          Playlist: {
            title: song.title,
            uri: song.uri,
            author: song.author,
            duration: song.length,
          },
        },
      },
    );

   const fav = new MessageEmbed()
     .setColor(client.embedColor)
                    .setDescription(`
<:notes:1119915814733217843>** Thank you for voting!**
This title has been saved to your collection.`)
  const sp = new MessageButton().setEmoji('1121668243116019783')
    .setURL(`${song.uri}`)
	.setStyle(`LINK`).setDisabled(false)
        const yt = new MessageButton()
      .setEmoji('1119915826326278265')
   .setURL(`https://www.youtube.com/c/diwasatreya`)
    .setStyle(`LINK`).setDisabled(false)
const b1 = new MessageButton().setCustomId(`like`).setEmoji(`1122029645135613953`).setStyle('SECONDARY').setDisabled(true)
const b2 = new MessageButton().setCustomId(`down`).setEmoji(`1121856261122699385`).setStyle('SECONDARY').setDisabled(true)
   const rowa = new MessageActionRow().addComponents(sp, yt, b1,b2);
   
i.followUp({
  embeds: [fav],
  components: [rowa], ephemeral: true
})

   
 }


 if (i.customId === `down`) {

   const fav = new MessageEmbed()
     .setColor(client.embedColor)
                    .setDescription(`**<:notes:1119915814733217843> Thank you for voting!**`)
i.followUp({
  embeds: [fav], ephemeral: true
})
 }
      
      
    })




    
  },
};
