const { CommandInteraction, Client, MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("../../schema/prefix.js");
const { Canvas, resolveImage } = require('canvas-constructor');
const canvas = require('canvas');
module.exports = {
  name: "profile",
  description: "Shows your profile",
  userPrams: ['MANAGE_GUILD'],
  botPrams: ['EMBED_LINKS'],
  /**
      * @param {Client} client
      * @param {CommandInteraction} interaction
      */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
    });


    const { registerFont } = require('canvas');
registerFont("RR.otf", { family: 'RR' });

const img = await canvas.loadImage(`bg.png`);


let userPfp = await resolveImage(interaction.user.displayAvatarURL({
            format: "jpg",
            size: 1024
        }))

let namee = interaction.user.username
    let image = new Canvas(754, 215)
      .printImage(img, 0, 0, 754, 215)
      .setColor(`#CD9B75`)
      .setTextFont('27px RR')
      .printWrappedText(namee, 288, 89)
      .printWrappedText("DEFAULT", 341, 137)
      .printCircularImage(userPfp, 111,107, 64,64)
      .toBuffer();

const imgg = new MessageAttachment(image, 'profile-atreya.png');
    
interaction.followUp({
  files: [imgg]
})
    
  }
}
