const Command = require('../../structures/Command')

const { embad } = require('../../ultis')
const db = require('quick.db');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'sethis',
            description: '[😉 Usuario] Voce coloca sua historia no perfil!.',
            options: [
              {
                name: 'historia',
                type: 'STRING',
                description: 'Sua historia.',
                required: true
              }
            ]
        })
    }

    run = (interaction) => {
      const his = interaction.options.getString('historia')
      db.set(`user_${interaction.user.id}.his`, his)

      const h = embad({
        color:"#FFFFFF",
        description:`***😉Historia adicionada com sucesso!😉***`
      })
      interaction.reply({ embeds: [h], ephemeral: true })
    }
}