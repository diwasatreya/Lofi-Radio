const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'volume',
  description: 'Shows & Changes the current volume.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'amount',
      description: 'new volume value to set',
      required: true,
      type: 'NUMBER',
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });

    const emojivolume = client.emoji.volumehigh;

    const vol = interaction.options.getNumber('amount');

    const player = client.manager.players.get(interaction.guildId);
    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor(client.embedColor).setDescription('There is no lo-fi playing.');
      return interaction.editReply({ embeds: [thing] });
    }
    const volume = Number(vol);
    if (!volume || volume < 0 || volume > 100) {
      return await interaction
        .editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(`
              <:error:1121723716494168134> **Invalid volume has been provided!**
              <:blank:1120331253569302619><:gear:1119915784756531331> Use /volume <0 - 100>`),
          ],
        })
    }


    await player.setVolume(volume / 1);
    if (volume > player.volume) {
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`
              <:dvd:1119915776732827778> ** Successfully volume has been changed!**
              <:blank:1120331253569302619><:loud:1119915800535511070> **Current Volume: ${volume}%**`);
      return interaction.editReply({ embeds: [thing] });
    } else if (volume < player.volume) {
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`
              <:dvd:1119915776732827778>  **Successfully volume has been changed!**
              <:blank:1120331253569302619><:loud:1119915800535511070> **Current Volume: ${volume}%**`);
      return interaction.editReply({ embeds: [thing] });
    } else {
      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`
              <:dvd:1119915776732827778>  **Successfully volume has been changed!**
              <:blank:1120331253569302619><:loud:1119915800535511070> **Current Volume: ${volume}%**`);
      return interaction.editReply({ embeds: [thing] });
    }
    
   
  },
};
