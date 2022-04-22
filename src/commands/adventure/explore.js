const Command = require('../../structures/Command')
const db = require('quick.db');

const combat = require('../../assets/combat.json')
const { random, embad } = require('../../ultis')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'explore',
            description: '[🌻 Aventura] Caça um monstro no seu andar atual'
        })
    }

    run =  (interaction) => {
      var channel = interaction.channel.name.split('-');
      if(channel[0] != 'floresta') {
        var embadd = embad({
          color:"#F00000",
          description:"***Você não está em uma floresta!***",
        })
        return interaction.reply({
          embeds: [embadd],
          ephemeral: true
        })
      }

      const player = db.get(`user_${interaction.user.id}.player`)

      if(player.vida <= 0) {
        let c = embad({
          color:"#F00000",
          title:"Você está implaz de explorar!😔",
          description:"***Recupere sua vida usando /life!***",
        })
        return interaction.reply({
          embeds: [c],
          ephemeral: true
        })
      }

      const isLuta = db.has(`user_${interaction.user.id}.luta`)

      if(isLuta) {
        let c = embad({
          color:"#FFFFFF",
          title:"Lute Primeiro!😉",
          description:"***Você está em luta! lute ou fuja usando /escape***",
        })
        return interaction.reply({
          embeds: [c],
          ephemeral: true
        })
      } 

      const is = random(1,50)
      
      if(is <= 10) {
        // Não encontra nd
        var c = embad({
          color:"#FFFFFF",
          title:"Nada!😪",
          description:"***Você não encontoru nada😥!***",
        })
        interaction.reply({
          embeds: [c],
          ephemeral: false
        })
      } else if (is <= 40) {

        var mob = combat.mobs[random(0, combat.mobs.length)]

        db.set(`user_${interaction.user.id}.luta`, mob)
        mob = db.get(`user_${interaction.user.id}.luta`)

        var v = embad({
          color:"#FFFFFF",
          title:`Você entrou em luta com o(a) ${mob.name}!😲`,
          description:`_Status do **${mob.name}**_`,
          filds:[
            { name: `Vida`, value: `${mob.vida}`, inline: true },
            { name: `Dano`, value: `${mob.dano}`, inline: true },
            { name: `Velocidade`, value: `${mob.velocidade}`, inline: true },
            { name: `Drop`, value: `${mob.drop}`, inline: true },
          ],
          footer:{text:"Você esta em combate use /atk para atacar ou use /escape para tentar escapar!"}
        })
        interaction.reply({
          embeds: [v],
          ephemeral: false
        })


      } else if (is <= 50) {
        // Acha Alguma Coisa
        var win = random(0, combat.win.length)

        db.push(`user_${interaction.user.id}.inv`, combat.win[win])
        
        var embadd = embad({
          color:"#FFFFFF",
          title:"Você encontrou algo!😲",
          description:`_Você encontoru um(a) **${combat.win[win].name}** 😁!_`,
          footer:{text:"Esse item foi para seu inventario use /inv para ver!"}
        })
        interaction.reply({
          embeds: [embadd],
          ephemeral: false
        })
      }
    }
}