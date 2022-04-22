const Command = require('../../structures/Command')
const db = require('quick.db');
const flo = require('../../assets/florestas');
const random = require('../../functions/Random')
const cooldown = require('../../functions/Cooldown')
const embad = require('../../functions/Embad')
const talkedRecently = new Set();

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'caçar',
            description: 'Caça um monstro no seu andar atual'
        })
    }

    run =  (interaction) => {
      for(const mob of flo) {
        if(mob.id == interaction.channel.id) {

          cooldown(interaction,talkedRecently, 10000, () => {
            const j = embad({
              color:"#FFF000",
              description:`**😥Aguarde 10s antes de usar novamente!😥**`
            })
            interaction.reply({ embeds: [j], ephemeral: true })
          }, () => {
            const rand = random(1, 3)
            const deathCoin = random(0, 50)
            const gold = random(0, 5)
            const mobb = mob.floresta[rand]
            
            db.add(`user_${interaction.user.id}.gold`, gold)
            db.add(`user_${interaction.user.id}.deathCoin`, deathCoin)
            const e = embad({
              color:"#FFFFFF",
              description:`***⚔️${interaction.user} matou um ${mobb}! E ele dropou ${deathCoin}<a:Death_Coin:966812927208341564> D. Coins e ${gold}<a:Gold_Coin:966812927166398565> G. Coins⚔️***`
            })
            const res = interaction.reply({ embeds: [e], ephemeral: false })
            setTimeout(() => {
              interaction.deleteReply()
            }, 10000);
          })
          
        } else {
          const h = embad({
            color:"#FFF000",
            description:`**😥Você não está em uma floresta!😥**`
          })
          interaction.reply({ embeds: [h], ephemeral: true })
        }
      }

    }
}