const { MessageEmbed, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');

const { MessageButton} = require("discord.js");

module.exports = {
  name: 'help',
  description: `Show Lofi Radio's help menu.`,
  userPrams: [],
  botPrams: ['EMBED_LINKS'],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    const prefix = client.prefix;

    await interaction.deferReply({
      ephemeral: false,
    });





    

    const embed = new MessageEmbed()
        .setColor(`#DDBD86`)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })

          .setDescription(`
<:notes:1119915814733217843> **Music:**
<:blank:1120331253569302619><:next:1119915811415539722> **/play:** Joins your voice channel and starts playing 24/7.
<:blank:1120331253569302619><:stop:1119915842893783052> **/stop:** Leaves the voice channel.
<:blank:1120331253569302619><:dvd:1119915776732827778> **/song:** Shows the current playing song.
<:blank:1120331253569302619><:radio:1119915830344437790> **/station:** Changes the radio station/theme.
<:blank:1120331253569302619><:loud:1119915800535511070> **/volume:** Shows or changes the current volume.
<:blank:1120331253569302619><:sleep:1119915834886856785> **/sleep:** Sets a sleep timer.
<:star:1119915839064379472> **Profiles:**
<:blank:1120331253569302619><:profile:1119915826326278265> **/profile:** Shows your profile.
<:blank:1120331253569302619><:am:1121668225839661076> **/remove:** Removes the liked song.
<:blank:1120331253569302619><:floppy_disk:1119915780931338280> **/collection:** Shows your liked songs collection.
<:config:1119915722534039612> **Config:**
<:blank:1120331253569302619><:mode:1119915805056966717> **/mode:** Switches between radio modes.
<:blank:1120331253569302619><:dj:1119915773742288917> **/djrole:** Sets which roles are considered DJs.
<:blank:1120331253569302619><:gear:1119915784756531331> **/settings:** Shows and configures server settings.
<:blank:1120331253569302619><:premium:1119915823964893214>  **/premium:** Shows information about Lofi Radio premium.
<:info:1119915789030535178> **Info:**
<:blank:1120331253569302619><:telegram:1119915847809515671> **/support:** Send us a message or [join](https://discord.gg/aromax-development-708565122188312579) our support server.
<:blank:1120331253569302619><:like:1119915795565269112> **/vote:** Vote for Lofi Radio.
<:blank:1120331253569302619><:invite:1119915791521955970> **/invite:** [Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) Lofi Radio to your server.
`)

const b1 = new MessageButton().setLabel(`Play`).setCustomId(`play`).setEmoji(`1119915811415539722`).setStyle('SECONDARY').setDisabled(false)
        const b2 = new MessageButton().setLabel(`Stop`).setCustomId(`stop`).setEmoji(`1119915842893783052`).setStyle('SECONDARY').setDisabled(false)
        const b3 = new MessageButton().setLabel(`Vote`).setEmoji('1119915795565269112')
    .setURL(`https://discord.gg/aromax-development-708565122188312579`)
	.setStyle(`LINK`).setDisabled(false)
        const b4 = new MessageButton() .setLabel(`Invite`)
      .setEmoji('1119915791521955970')
   .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
    .setStyle(`LINK`).setDisabled(false)


const b5 = new MessageButton().setLabel(`Play`).setCustomId(`play`).setEmoji(`1119915811415539722`).setStyle('SECONDARY').setDisabled(true)
        const b6 = new MessageButton().setLabel(`Stop`).setCustomId(`stop`).setEmoji(`1119915842893783052`).setStyle('SECONDARY').setDisabled(true)

    const drow = new MessageActionRow().addComponents(b5, b6, b3, b4);

    const row = new MessageActionRow().addComponents(b1, b2, b3, b4);

  let m =  await interaction.followUp({ embeds: [embed], components: [row] })


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
    
  const played = new MessageEmbed()
                    .setColor("#DDBD86")
                    .setDescription(`
<:notes:1119915814733217843> Successfully joined and bound to ${interaction.member.voice.channel}.
<:blank:1120331253569302619><:dvd:1119915776732827778> **You can enable 24/7 mode by voting here.**`)
    
    collector.on('end', async () => {
      if (!m) return;
      m.edit({ embeds: [embed], components: [drow] })
    });

    collector.on('collect', async i => {
      if (!i.deferred) await i.deferUpdate();

      if (i.customId === `play`) {
  if (interaction.guild.members.me.voice.channel) {
          if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return await i
              .followUp({ embeds: [{
      color: '#DDBD86',
      description: `<:loud:1119915800535511070> You have to be in same voice channel to use this command.`
    }], ephemeral: true})
              .catch(() => { });
          }
        } else if (!i.member.voice.channel) {
        return await i
          .followUp({ embeds: [{
      color: '#DDBD86',
      description: `<:loud:1119915800535511070> You have to be connected to a voice channel to use this command.`
    }], ephemeral: true})
          .catch(() => { });
      } else {

const player = await client.manager.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      deaf: true,
    });
const db = require('../../schema/station.js');
   



   
     const ress = await db.findOne({ Guild: interaction.guildId });

  let  station;
if(!ress) {
  station = "default"
}
      
    if (ress && ress.Radio) station = ress.Radio;
let np;

if(station == "default")
{
  const anim = require('../../songs/default.json');
  np = anim.words[Math.floor((Math.random() * anim.words.length))];
}
    
if(station == "Anime lo-fi")
{
  const anime = require('../../songs/anime.json');
  np = anime.words[Math.floor((Math.random() * anime.words.length))];
}

    if(station == "Sleep lo-fi")
{
  const sleep = require('../../songs/sleep.json');
  np = sleep.words[Math.floor((Math.random() * sleep.words.length))];
}

    if(station == "Study lo-fi")
{
  const study = require('../../songs/study.json');
 np = study.words[Math.floor((Math.random() * study.words.length))];
}

    let query = np;

 

    const result = await player.search(query, { requester: interaction.user });

    if (!result.tracks.length) return interaction.editReply({ content: 'No result was found' });
    const tracks = result.tracks;
 const bb = new MessageButton().setLabel(`Vote for ${client.user.username}`).setEmoji('1119915795565269112')
    .setURL(`https://discord.gg/aromax-development-708565122188312579`)
	.setStyle(`LINK`).setDisabled(false)
                
                      if (result.type === "PLAYLIST") for (let track of result.tracks) player.queue.add(track);
    else player.queue.add(result.tracks[0]);
if (!player.playing && !player.paused) player.play();
                const roww = new MessageActionRow().addComponents(bb);
         await i.followUp({ embeds: [played], components: [roww]});
              }
        }


      if (i.customId === `stop`) {
          
const player = client.manager.players.get(i.guild.id);
      if (interaction.guild.members.me.voice.channel) {
          if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return await i
              .followUp({ embeds: [{
      color: '#DDBD86',
      description: `👋`
    }], ephemeral: true})
              .catch(() => { });
          }
        }  
        if (!i.member.voice.channel) {
        return await i
          .followUp({ embeds: [{
      color: '#DDBD86',
      description: `👋`
    }], ephemeral: true})
          .catch(() => { });
      }
        
if(player.queue.current) {
await player.destroy(interaction.guild.id);

await i.followUp({ embeds: [{
      color: '#DDBD86',
      description: `<:stop:1119915842893783052> Successfully disconnected from ${i.member.voice.channel}
 `
    }]})
} if(player.queue.current == "undefined") {
   return await i
          .followUp({ embeds: [{
      color: '#DDBD86',
      description: `👋`
    }], ephemeral: true})
}
      
        
      }

      

    });
  },
};
