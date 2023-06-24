const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/playlist");
const { convertTime } = require("../../utils/convert.js");
const lodash = require("lodash");

module.exports = {
  name: 'collection',
  description: 'Shows your liked songs collection',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({});

    const Name = "Favourite";
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You haven't liked any songs yet!`),
        ],
      });
    } 
    let pname = data.PlaylistName;
    let plist = data.Playlist.length;
    let tracks = data.Playlist.map(
      (x, i) =>
        `${+i}. ${x.title && x.uri ? `[${x.title}](${x.uri})` : `${x.title}`}`,
    );
    const pages = lodash.chunk(tracks, 10).map((x) => x.join('\n'));
    let page = 0;

    const embed = new MessageEmbed()
      .setAuthor({ name: `Liked Songs Collection`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
      .setColor(client.embedColor)
      .setDescription(`\n\n${pages[page]}`);
    if (pages.length <= 1) {
      return await interaction.editReply({ embeds: [embed] });
    } else {
      let previousbut = new MessageButton()
        .setCustomId('Previous')
        .setEmoji('⏪')
        .setStyle('SECONDARY');

      let nextbut = new MessageButton().setCustomId('Next').setEmoji('⏩').setStyle('SECONDARY');

      let stopbut = new MessageButton().setCustomId('Stop').setEmoji('⏹️').setStyle('SECONDARY');

      const row = new MessageActionRow().addComponents(previousbut, stopbut, nextbut);

      await interaction.editReply({ embeds: [embed], components: [row] });

      const collector = interaction.channel.createMessageComponentCollector({
        filter: (b) =>
          b.user.id === interaction.member.user.id
            ? true
            : false && b.deferUpdate().catch(() => {}),
        time: 60000 * 5,
        idle: (60000 * 5) / 2,
      });

      collector.on('end', async () => {
        await interaction.editReply({
          components: [
            new MessageActionRow().addComponents(
              previousbut.setDisabled(true),
              stopbut.setDisabled(true),
              nextbut.setDisabled(true),
            ),
          ],
        });
      });

      collector.on('collect', async (b) => {
        if (!b.deferred) await b.deferUpdate().catch(() => {});
        if (b.customId === 'Previous') {
          page = page - 1 < 0 ? pages.length - 1 : --page;

          embed.setDescription(
            `\n\n${pages[page]}`,
          );

          return await interaction.editReply({ embeds: [embed] });
        } else if (b.customId === 'Stop') {
          return collector.stop();
        } else if (b.customId === 'Next')
          page = page + 1 >= pages.length ? 0 : ++page;

        embed.setDescription(
          `\n\n${pages[page]}`,
        );

        return await interaction.editReply({ embeds: [embed] });
      });
    }
  },
};


