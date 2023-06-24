const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db1 = require("../../schema/station.js");
const db2 = require('../../schema/mode.js');
module.exports = {
  name: "settings",
  description: "Shows the server settings",
  userPrams: ['MANAGE_GUILD'],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  /**
      * @param {Client} client
      * @param {CommandInteraction} interaction
      */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
    });


    let station;
    let mode;
const ress = await db1.findOne({ Guild: interaction.guildId });
    if (ress && ress.Radio) station = ress.Radio;

const res = await db2.findOne({ Guild: interaction.guildId });
    if (res && res.mode) mode = res.mode;


if(!ress){
  station = "Lofi Radio (Default)"
}

    if(!res){
      mode = "None"
    }
    
    
const np = new MessageEmbed()
  .setAuthor({ name: `${client.user.username} Setting`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
//                     .setDescription(`
// <:notes:1119915814733217843> **Playing Song:**
// <:blank:1120331253569302619><:next:1119915811415539722> **${song.title}**`)

      .addFields([
        {
          name: `<:radio:1119915830344437790> Radio Station`,
          value: `${station}`,
          inline: true,
        },
        {
          name: `<:mode:1119915805056966717> Radio Mode`,
          value: `${mode}`,
          inline: true,
        },
      ])
      .setColor(client.embedColor);


interaction.followUp({
  embeds: [np]
})

    
  }
}
