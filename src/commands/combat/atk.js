const Command = require('../../structures/Command')
const db = require('quick.db');
const combat = require('../../assets/combat.json')
const { random, embad } = require('../../ultis')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'atk',
            description: '[⚔️ Combat] Ataca o mob atual.'
        })
    }

    run = async (interaction) => {
      const mob = db.get(`user_${interaction.user.id}.luta`)
      if(!db.has(`user_${interaction.user.id}.player`)) {
        db.set(`user_${interaction.user.id}.player`, { vida:100, velocidade: 20, dano: 40, defesa:0 })
      }
      const player = db.get(`user_${interaction.user.id}.player`)

      if(!mob) {
        let c = embad({
          color:"#FFFFFF",
          title:"Voçê não esta em luta!🤨",
          description:"***Tente achar algo na floresta!***",
        })
        return interaction.reply({
          embeds: [c],
          ephemeral: true
        })
      } 


      var vMob = random(0, mob.velocidade)
      var vplayer = random(0, player.velocidade || 10)
      var dMob = random(0, mob.dano)
      var dplayer = random(0, player.dano || 30)

      if(vMob >= vplayer) {
        var fg = dMob - player.defesa

        db.subtract(`user_${interaction.user.id}.player.vida`, fg)
        var t = db.get(`user_${interaction.user.id}.player`)
        var lo = db.get(`user_${interaction.user.id}.luta`)

        let f = embad({
          color:"#F00000",
          title:"📡Status da luta📡",
          description:`***${mob.name} acertou primeiro!*** \nVelocidade do(a) ${interaction.user}: ${vplayer} \nVelocidade do(a) ${mob.name}: ${vMob}`,
          filds: [
            { name: `O dano causado pelo(a) ${mob.name} foi de:`, value: ` ${dMob}(Dano total) - ${player.defesa}(Sua defesa) = ${fg}(Dano recebido)`, inline: true }
          ],
          footer:{text:`Sua Vida Atual: ${t.vida} | Vida do ${mob.name}: ${lo.vida}`}
        })
        interaction.reply({
          embeds: [f],
          ephemeral: false
        })
      } else if(vMob <= vplayer) {
        var fg = dplayer - mob.defesa

        db.subtract(`user_${interaction.user.id}.luta.vida`, fg)
        var t = db.get(`user_${interaction.user.id}.player`)
        var lo = db.get(`user_${interaction.user.id}.luta`)

        let f = embad({
          color:"#00F000",
          title:"📡Status da luta📡",
          description:`***${interaction.user} acertou primeiro!*** \nVelocidade do(a) ${interaction.user}: ${vplayer} \nVelocidade do(a) ${mob.name}: ${vMob}`,
          filds: [
            { name: `O dano causado pelo(a) ${interaction.user.username} foi de:`, value: ` ${dplayer}(Dano total) - ${mob.defesa}(Defesa do ${mob.name}) = ${fg}(Dano recebido)`, inline: true }
          ],
          footer:{text:`Sua Vida Atual: ${t.vida} | Vida do ${mob.name}: ${lo.vida}`}
        })
         interaction.reply({
          embeds: [f],
          ephemeral: false
        })
      }
      

      var playerF = db.get(`user_${interaction.user.id}.player`)
      var mobF = db.get(`user_${interaction.user.id}.luta`)

      if(playerF.vida <= 0) {
        var fcla = random(0, mobF.drop)
        if(!db.has(`user_${interaction.user.id}.gold`)) {
          db.set(`user_${interaction.user.id}.gold`, 0)
        }
        db.subtract(`user_${interaction.user.id}.gold`, fcla)
        db.delete(`user_${interaction.user.id}.luta`)
        let dsd = embad({
          color:"#F00000",
          title:"😪GAME OVER😪",
          description:`Você morreu e perdeu ${fcla} gold coins`,
          footer:{text:`Tente a sorte uma proxima vez!`}
        })
        return interaction.channel.send({
          embeds: [dsd],
          ephemeral: false
        })
      }

      if(mobF.vida <= 0) {
        var j = random(0, mobF.drop)
        await db.add(`user_${interaction.user.id}.gold`, j)
        await db.delete(`user_${interaction.user.id}.luta`)
        let df = embad({
          color:"#00F000",
          title:"😁WIN😁",
          description:`Você matou o(a) ${mobF.name} e ganhou ${j} gold coins`,
          footer:{text:`Parábens!`}
        })
        return interaction.channel.send({
          embeds: [df],
          ephemeral: false
        })
      }
    }
}