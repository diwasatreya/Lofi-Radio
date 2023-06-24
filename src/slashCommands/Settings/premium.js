const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db1 = require("../../schema/station.js");
const db2 = require('../../schema/mode.js');
module.exports = {
  name: "premium",
  description: "Shows information about Lofi Bot premium",
  userPrams: ['MANAGE_GUILD'],
  botPrams: ['EMBED_LINKS'],
  /**
      * @param {Client} client
      * @param {CommandInteraction} interaction
      */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
    });

const ress = await db1.findOne({ Guild: interaction.guildId });
    if (ress && ress.Radio) station = ress.Radio;

const res = await db2.findOne({ Guild: interaction.guildId });
    if (res && res.mode) mode = res.mode;
    
const np = new MessageEmbed()
  .setAuthor({ name: `${client.user.username} Premium`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                    .setDescription(`
**<:heart:1121845314341581022> Premium perks:
<:blank:1120331253569302619><:notes:1119915814733217843> 24/7 Music Playback.
<:blank:1120331253569302619><:loud:1119915800535511070> Volume controls.
<:blank:1120331253569302619><:radio:1119915830344437790> Multiple radio stations/themes.
<:blank:1120331253569302619><:floppy_disk:1119915780931338280> Create custom radio stations using your playlists.
<:blank:1120331253569302619><:dvd:1119915776732827778> Higher quality audio.
<:blank:1120331253569302619><:dj:1119915773742288917>  Set up server DJ roles.
<:blank:1120331253569302619><:timer:1121732448670199879> Lower commands cooldown.
<:blank:1120331253569302619><:premium:1119915823964893214>  Early access to Lofi Radio's new features.
<:blank:1120331253569302619><:telegram:1119915847809515671>  Priority support.
<:info:1119915789030535178> How to get premium?
<:blank:1120331253569302619><:premium:1119915823964893214>  By becoming a member on our Patreon page.**`)


      .setColor(client.embedColor);


interaction.followUp({
  embeds: [np]
})

    
  }
}
