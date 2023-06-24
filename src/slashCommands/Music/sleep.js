const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu, CommandInteraction, Client } = require('discord.js');
const db = require("../../schema/autoReconnect");
const db1 = require('../../schema/station.js');

module.exports = {
    name: 'sleep',
    description: 'Changes the radio station/theme.',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    player: false,
    dj: true,
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
  let station = "Lofi Radio (Default)"
const ress = await db1.findOne({ Guild: interaction.guildId });
    if (ress && ress.Radio) station = ress.Radio;
      
            let thing = new MessageEmbed()
                .setColor(client.embedColor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setDescription(`
                Sleep Timer lets you fall asleep to lofi tunes. At the end of the countdown Lofi Radio will disconnect you from the voice channel, allowing you to sleep well and stops your battery from draining.
                <:timer:1121732448670199879> **Timer Status**
                <:blank:1120331253569302619><:mode:1119915805056966717> **Inactive**
                `)


 const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('sleep')
          .setMinValues(1)
          .setMaxValues(1)
      
          .setPlaceholder('🌙 Set up a sleep timer!')
          .addOptions([
            {
              label: '30 Minutes',
              value: 'half',
              emoji: '1121732448670199879',
            },
            {
              label: '1 Hour',
              value: 'hour',
              emoji: '1121732448670199879',
            },
            {
              label: '1 Hour 30 Minutes',
              value: 'onehalf',
              emoji: '1121732448670199879',
            },
            {
              label: '2 Hours',
              value: 'twohour',
              emoji: '1121732448670199879',
            }
          ])
      )


       const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('dsleep')
        .setDisabled(true)
          .setMinValues(1)
          .setMaxValues(1)
      
          .setPlaceholder('🌙 Set up a sleep timer!')
          .addOptions([
            {
              label: '30 Minutes',
              value: 'half',
              emoji: '1121732448670199879',
            },
            {
              label: '1 Hour',
              value: 'hour',
              emoji: '1121732448670199879',
            },
            {
              label: '1 Hour 30 Minutes',
              value: 'onehalf',
              emoji: '1121732448670199879',
            },
            {
              label: '2 Hours',
              value: 'twohour',
              emoji: '1121732448670199879',
            }
          ])
      )

const b1 = new MessageButton().setLabel("Cancel Timer").setCustomId(`cancel`).setEmoji(`1121723716494168134`).setStyle('SECONDARY').setDisabled(false)

      const b2 = new MessageButton().setLabel("Cancel Timer").setCustomId(`Cancell`).setEmoji(`1121723716494168134`).setStyle('SECONDARY').setDisabled(true)

      const row3 = new MessageActionRow().addComponents(b1);
      const row4 = new MessageActionRow().addComponents(b2);
      
        const m =  await  interaction.followUp({ embeds: [thing], components: [row] })

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
      componentType: "SELECT_MENU",
      time: 20000,
      idle: 20000 / 2,
    });

        const collectorr = m.createMessageComponentCollector({
      filter: (i) => {
        if (i.user.id === interaction.user.id) return true;
        else {
          i.followUp({
            ephemeral: true,
            content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      componentType: "BUTTON",
      time: 60000,
      idle: 20000 / 2,
    });
let tt;
      collectorr.on("collect", async i => {
if (!i.deferred) i.deferUpdate();
        if (i.customId === `cancel`) {
 m.edit({
          embeds: [thing],
    components: [row4]
        });

    clearInterval(tt);

          
}
      })

collector.on('end', async () => {
  
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

      
      collector.on("collect", async i => {
      if (!i.deferred) i.deferUpdate();
      const options = i.values[0];




        
if (options === 'half') {

        let thing = new MessageEmbed()
                .setColor(client.embedColor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
                .setDescription(`
                Sleep Timer lets you fall asleep to lofi tunes. At the end of the countdown Lofi Radio will disconnect you from the voice channel, allowing you to sleep well and stops your battery from draining.
                <:timer:1121732448670199879> **Timer Status**
                <:blank:1120331253569302619><:mode:1119915805056966717> **${interaction.member} will be removed after \`30 minutes\`**
                `)
  
function intervalFunc() {
  const player = client.manager.players.get(interaction.guild.id); 
  
  if(!interaction.member.voice.channel){
        if (!m) return; 
  i.followUp({
          content: `**Sleep Timer Info:** \`${interaction.user.tag}\`, you are already disconnected from voice channel`
        });
  } else{
    interaction.member.voice.disconnect();
  }
// player.destroy(interaction.guild.id);
  clearInterval(tt);
}


    tt = setInterval(intervalFunc, 20000);
  
  
    if (!m) return; 
  m.edit({
          embeds: [thing],
    components: [row3]
        });

      }


        if (options === 'hour') {
    
        let thing = new MessageEmbed()
                .setColor(client.embedColor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
             .setDescription(`
                Sleep Timer lets you fall asleep to lofi tunes. At the end of the countdown Lofi Radio will disconnect you from the voice channel, allowing you to sleep well and stops your battery from draining.
                <:timer:1121732448670199879> **Timer Status**
                <:blank:1120331253569302619><:mode:1119915805056966717> **${interaction.member} will be removed after \`1 Hours\`**
                `)
  
function intervalFunc() {
  const player = client.manager.players.get(interaction.guild.id); 
  
  if(!interaction.member.voice.channel){
        if (!m) return; 
  i.followUp({
          content: `**Sleep Timer Info:** \`${interaction.user.tag}\`, you are already disconnected from voice channel`
        });
  } else{
    interaction.member.voice.disconnect();
  }
// player.destroy(interaction.guild.id);
  clearInterval(tt);
}

 
    tt = setInterval(intervalFunc, 3600000);
  
  // clearInterval(tt);
    if (!m) return; 
  m.edit({
          embeds: [thing],
    components: [row3]
        });

      }

  if (options === 'onehalf') {
    
        let thing = new MessageEmbed()
                .setColor(client.embedColor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
          .setDescription(`
                Sleep Timer lets you fall asleep to lofi tunes. At the end of the countdown Lofi Radio will disconnect you from the voice channel, allowing you to sleep well and stops your battery from draining.
                <:timer:1121732448670199879> **Timer Status**
                <:blank:1120331253569302619><:mode:1119915805056966717> **${interaction.member} will be removed after \`1 Hour 30 minutes\`**
                `)
  
function intervalFunc() {
  const player = client.manager.players.get(interaction.guild.id); 
  
  if(!interaction.member.voice.channel){
        if (!m) return; 
  i.followUp({
          content: `**Sleep Timer Info:** \`${interaction.user.tag}\`, you are already disconnected from voice channel`
        });
  } else{
    interaction.member.voice.disconnect();
  }
// player.destroy(interaction.guild.id);
  clearInterval(tt);
}


   tt = setInterval(intervalFunc, 4680000);

  // clearInterval(tt);
    if (!m) return; 
  m.edit({
          embeds: [thing],
    components: [row3]
        });

      }

        if (options === 'twohour') {
    
        let thing = new MessageEmbed()
                .setColor(client.embedColor)
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL(), url: `https://discord.gg/aromax-development-708565122188312579` })
          .setDescription(`
                Sleep Timer lets you fall asleep to lofi tunes. At the end of the countdown Lofi Radio will disconnect you from the voice channel, allowing you to sleep well and stops your battery from draining.
                <:timer:1121732448670199879> **Timer Status**
                <:blank:1120331253569302619><:mode:1119915805056966717> **${interaction.member} will be removed after \`2 Hours\`**
                `)
  
function intervalFunc() {
  const player = client.manager.players.get(interaction.guild.id); 
  
  if(!interaction.member.voice.channel){
        if (!m) return; 
  i.followUp({
          content: `**Sleep Timer Info:** \`${interaction.user.tag}\`, you are already disconnected from voice channel`
        });
  } else{
    interaction.member.voice.disconnect();
  }
// player.destroy(interaction.guild.id);
  clearInterval(tt);
}


     tt = setInterval(intervalFunc, 7200000);
  
  // clearInterval(tt);
    if (!m) return; 
  m.edit({
          embeds: [thing],
    components: [row3]
        });

      }

        

      })



      
        }

    }
