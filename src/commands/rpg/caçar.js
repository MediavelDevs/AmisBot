const Command = require('../../structures/Command')
const db = require('quick.db');
const mobs = require('../../../mobs');
const talkedRecently = new Set();
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'caçar',
            description: 'Caça um monstro no seu andar atual'
        })
    }

    run =  (interaction) => {
      for(const mob of mobs) {
        if(mob.id == interaction.channel.id) {
          if (talkedRecently.has(interaction.user.id)) {
            interaction.reply({ content: `**😥Aguarde 10s antes de usar novamente!😥**`, ephemeral: true })
        } else {

          const rand = getRandomInt(1, 3)
          const coins = getRandomInt(0, 100)
          const mobb = mob.floresta[rand]
          
          db.add(`user_${interaction.user.id}.coins`, coins)
          interaction.reply({ content: `***⚔️Você matou um ${mobb}! E ele dropou ${coins} Coins⚔️***`, ephemeral: false })

            talkedRecently.add(interaction.user.id);
            setTimeout(() => {
              talkedRecently.delete(interaction.user.id);
            }, 10000);
        }
        } else {
          interaction.reply({ content: `**😥Você não está em uma floresta!😥**`, ephemeral: true })
        }
      }

    }
}