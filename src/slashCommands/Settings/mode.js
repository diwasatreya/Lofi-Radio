const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/autoReconnect");
const db1 = require('../../schema/station.js');
const db2 = require('../../schema/mode.js');
module.exports = {
    name: 'mode',
    description: 'Switches between radio mode',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: false,
    dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
       await interaction.deferReply({
        ephemeral: false,
       });
  let mode = "None"
const ress = await db2.findOne({ Guild: interaction.guildId });
    if (ress && ress.mode) mode = ress.mode;



 const player = client.manager.players.get(interaction.guild.id);

        let data = await db.findOne({Guild: interaction.guild.id})
      
      
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
              .setAuthor({ name: `${client.user.username} - Modes`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setDescription(`<:dvd:1119915776732827778> Current Radio Mode: **${mode}**`)


let b1 = new MessageButton().setLabel("24/7").setCustomId(`two`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(false)
      let b2 = new MessageButton().setLabel("Auto Play").setCustomId(`auto`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(false)
const b3 = new MessageButton().setLabel("Session").setCustomId(`session`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(false)
      const b4 = new MessageButton().setCustomId(`info`).setEmoji(`1119915789030535178`).setStyle('SECONDARY').setDisabled(false)

const b5 = new MessageButton().setLabel("24/7").setCustomId(`twoo`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
      const b6 = new MessageButton().setLabel("Auto Play").setCustomId(`autoo`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
const b7 = new MessageButton().setLabel("Session").setCustomId(`sessionn`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
      const b8 = new MessageButton().setCustomId(`infoo`).setEmoji(`1119915789030535178`).setStyle('SECONDARY').setDisabled(true)
      
if(mode == "24/7"){
   b1 = new MessageButton().setLabel("24/7").setCustomId(`two`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
} 
if(mode == "Auto Play"){
    b2 = new MessageButton().setLabel("Auto Play").setCustomId(`auto`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
} 
if(mode == "Session"){
    b3 = new MessageButton().setLabel("Session").setCustomId(`sessionn`).setEmoji(`1119915805056966717`).setStyle('SECONDARY').setDisabled(true)
} 
      

      const row3 = new MessageActionRow().addComponents(b1, b2, b3, b4);
      const row4 = new MessageActionRow().addComponents(b5, b6, b7, b8);
      
        const m =  await  interaction.followUp({ embeds: [thing], components: [row3] })

    const collector = m.createMessageComponentCollector({
      filter: (i) => {
        if (i.user.id === interaction.user.id) return true;
        else {
          i.followUp({
            ephemeral: true,
            content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "BUTTON",
      time: 20000,
      idle: 20000 / 2,
    });



collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row4] }).catch(() => { });
    });

      
      collector.on("collect", async i => {
      if (!i.deferred) i.deferUpdate();
      


        if (i.customId === 'two') {
    
         let slp = new MessageEmbed()
           .setAuthor({ name: `${client.user.username} - Modes`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setColor(client.embedColor)
                .setDescription(`<:dvd:1119915776732827778> Current Radio Mode: **24/7** `)

   if(!player){
     interaction.followUp({ content: "Play any song to enable 24/7", ephemeral: true})
   } else {
          
 if (data) {
            
           
            interaction.editReply({ embeds: [slp], components:[row4] })
        } else {
            data = new db({
                Guild: player.guildId,
                TextId: player.textId,
                VoiceId: player.voiceId
            })
            await data.save();
            interaction.editReply({ embeds: [slp], components:[row4] })
        }
        
          
               if (ress) {
      ress.oldmode = mode;
      ress.mode = "24/7";
      await ress.save()
             
    } else {
      const newData = new db2({
        Guild: interaction.guildId,
        mode: "24/7",
        oldmode: mode
      });
      await newData.save()
      
    }

        }
        }



        if (i.customId === 'auto') {
    
         let slp = new MessageEmbed()
                .setColor(client.embedColor)
           .setAuthor({ name: `${client.user.username} - Modes`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setDescription(`<:dvd:1119915776732827778> Current Radio Mode: **Auto Play** `)

   if(!player){
     interaction.followUp({ content: "Play any song to enable Auto Play", ephemeral: true})
   } else {

interaction.editReply({ embeds: [slp], components:[row4] })
      player.data.set("autoplay", !player.data.get("autoplay"));
        player.data.set("requester", interaction.user);
          let data = await db.findOne({Guild: interaction.guild.id})
            await data.delete();
          
               if (ress) {
      ress.oldmode = mode;
      ress.mode = "Auto Play";
      await ress.save()
             
    } else {
      const newData = new db2({
        Guild: interaction.guildId,
        mode: "Auto Play",
        oldmode: mode
      });
      await newData.save()
      
    }

        }
        }



            if (i.customId === 'session') {
    
         let slp = new MessageEmbed()
                .setColor(client.embedColor)
           .setAuthor({ name: `${client.user.username} - Modes`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setDescription(`<:dvd:1119915776732827778> Current Radio Mode: **Session** `)

   if(!player){
     interaction.followUp({ content: "Play any song to enable Session", ephemeral: true})
   } else {

interaction.editReply({ embeds: [slp], components:[row4] })
          let data = await db.findOne({Guild: interaction.guild.id})
            await data.delete();
          
               if (ress) {
      ress.oldmode = mode;
      ress.mode = "Session";
      await ress.save()
             
    } else {
      const newData = new db2({
        Guild: interaction.guildId,
        mode: "Session",
        oldmode: mode
      });
      await newData.save()
      
    }

        }
        }

            if (i.customId === 'info') {
    
         let slp = new MessageEmbed()
           .setAuthor({ name: `${client.user.username} - Help`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setColor(client.embedColor)
           
                .setDescription(`
                <:mode:1119915805056966717> **Radio Modes**
<:blank:1120331253569302619> **Session:** Kinda like disabling the modes
<:blank:1120331253569302619> **Auto Play:** Auto plays songs.
<:blank:1120331253569302619> **24/7:** Always connected.
                `)

interaction.followUp({ embeds: [slp], ephemeral: true})


              
        }



        

      })



      
        }

    }
