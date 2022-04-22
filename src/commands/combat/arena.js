const Command = require('../../structures/Command')
const db = require('quick.db');
const arenas = require('../../assets/arenas');
const random = require('../../functions/Random')
const embad = require('../../functions/Embad')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'arena',
            description: 'Lutas na arena com personagens COMUNS, MINEBOSSES E BOSSES.',
            options: [
              {
                  name: 'personagem',
                  type: 'STRING',
                  description: 'Escolher um nivel de mob para lutar.',
                  required: true,
                  choices: [
                    {
                      name:"comum",
                      value: "co"
                    },
                    {
                      name:"mineboss",
                      value: "mb"
                    },
                    {
                      name:"boss",
                      value: "b"
                    },
                  ]
              }
          ]
        })
    }

    run =  (interaction) => {
      for(const arena of arenas) {
        if(arena.id == interaction.channel.id) {
          const es = interaction.options.getString('personagem')


          var mobs = db.get(`user_${interaction.user.id}.mob.${es}`)
          var player = db.get(`user_${interaction.user.id}.luta`)
          const v =  db.get(`user_${interaction.user.id}.luta.vida`)
          const d =  db.get(`user_${interaction.user.id}.luta.defesa`)
          if (!v) db.set(`user_${interaction.user.id}.luta.vida`, 100)
          if (!d) db.set(`user_${interaction.user.id}.luta.defesa`, 20)
          if (!mobs) db.set(`user_${interaction.user.id}.mob.${es}.vida`, arena[es].vida)
          player = db.get(`user_${interaction.user.id}.luta`)
          mobs = db.get(`user_${interaction.user.id}.mob.${es}`)

            const e = embad({
              title:`😡 Luta 😡`,
              color:'#ffffff',
              filds: [
                  { name: `Vida do(a) ${interaction.user.username}`, value: `${player.vida}`, inline: true },
                  { name: `Defesa do(a) ${interaction.user.username}`, value: `${player.defesa}`, inline: true },
                  { name: '\u200B', value: '\u200B' },
                  { name: `Vida do(a) ${arena[es].name}`, value: `${mobs.vida}`, inline: true },
                  { name: `Defesa do(a) ${arena[es].name}`, value: `${arena[es].defesa}`, inline: true },
              ]
            })
            interaction.reply({
              embeds: [e],
              ephemeral: false
            })
            
            const dano = random(0, player.dano || 50)
            const danomob = random(0, arena[es].damage) 
            const resP = arena[es].defesa >= dano
            const resM = player.defesa >= danomob

            switch(resP) {
              case true:
                  const w = embad({
                    color:"#F00000",
                    title:`Seu dano foi: ${dano}`,
                    description:`***😥${interaction.user} Não passou pela defesa do(a) ${arena[es].name}😥***`
                  })
                  interaction.channel.send({ embeds: [w], ephemeral: false })
                break
              case false:
                  db.subtract(`user_${interaction.user.id}.mob.${es}.vida`, dano)
                  var f = embad({
                    color:"#0FF000",
                    title:`Seu dano foi: ${dano}`,
                    description:`***😁${interaction.user} deu ${dano} de dano em ${arena[es].name}😁***`
                  })
                  interaction.channel.send({ embeds: [f], ephemeral: false })
                break
            }

            switch(resM) {
              case true:

                  var o = embad({
                    color:"#0FF000",
                    title:`Dano do(a) ${arena[es].name} foi: ${danomob}`,
                    description:`***😁${arena[es].name} Não passou pela defesa do(a) ${interaction.user}😁***`
                  })
                  interaction.channel.send({ embeds: [o], ephemeral: false })
                break
              case false:
                  db.subtract(`user_${interaction.user.id}.luta.vida`, danomob)
                  var b = embad({
                    color:"#F00000",
                    title:`Dano do(a) ${arena[es].name} foi: ${danomob}`,
                    description:`***😥${arena[es].name} deu ${danomob} de dano em ${interaction.user}😥***`
                  })
                  interaction.channel.send({ embeds: [b], ephemeral: false })
                
                break
            }

            const mobsv = db.get(`user_${interaction.user.id}.mob.${es}.vida`)
            const playerv = db.get(`user_${interaction.user.id}.luta.vida`)

            if (mobsv <= 0) {
                const money = random(0, arena[es].drop)
                db.add(`user_${interaction.user.id}.gold`, money)
                db.delete(`user_${interaction.user.id}.mob.${es}`)
                db.delete(`user_${interaction.user.id}.luta`)
                var n = embad({
                  color:"#FFFFFF",
                  description:`***😁${interaction.user} Venceu o ${arena[es].name} e ganhou ${money}<a:Gold_Coin:966812927166398565> Gold Coins 😁***`
                })
                interaction.channel.send({ embeds: [n], ephemeral: false })
            }
            if (playerv <= 0) {

                const money = random(0, arena[es].drop)
                db.subtract(`user_${interaction.user.id}.gold`, money)
                db.delete(`user_${interaction.user.id}.mob.${es}`)
                db.delete(`user_${interaction.user.id}.luta`)
                var no = embad({
                  color:"#F00000",
                  description:`***😔${interaction.user} morreu para o(a) ${arena[es].name} e perdeu ${money}<a:Gold_Coin:966812927166398565> Gold Coins 😔***`
                })
                interaction.channel.send({ embeds: [no], ephemeral: false })

            }

        } else {
          const h = embad({
            color:"#FFF000",
            description:`**😥Você não está em uma arena!😥**`
          })
          interaction.reply({ embeds: [h], ephemeral: true })
        }
      }

    }
}