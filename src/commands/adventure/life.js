const Command = require('../../structures/Command')
const db = require('quick.db');
const { random, embad } = require('../../ultis')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'life',
            description: '[🌻 Aventura] Recupera sua vida total.'
        })
    }

    run = (interaction) => {
      const player = db.get(`user_${interaction.user.id}.player`)

      if(player.vida > 0) {
        var cvc = embad({
          color:"#FFFFFF",
          title:"???",
          description:`***Os medicos chutaram ${interaction.user} pra fora do hospital***`,
          footer:{text:`Você não precisa ir ao hospital`}
        })
        return interaction.reply({
          embeds: [cvc],
          ephemeral: false
        })
      }
      const buy = player.vida * -1 + random(0, 100)
      db.subtract(`user_${interaction.user.id}.gold`, buy)
      const tl = db.get(`user_${interaction.user.id}.totallife`)
      db.set(`user_${interaction.user.id}.player.vida`, tl || 100)

      var c = embad({
        color:"#FFFFFF",
        title:"Descanço!😴😷",
        description:`***${interaction.user} descançou no hospital e recuperou a sua vida!***`,
        footer:{text:`Gastos no hospital: ${buy}`}
      })
      interaction.reply({
        embeds: [c],
        ephemeral: false
      })
    }
}