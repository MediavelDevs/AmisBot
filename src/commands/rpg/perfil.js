const Command = require('../../structures/Command')
const db = require('quick.db');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'perfil',
            description: 'Mostra o perfil do usuario.'
        })
    }

    run = (interaction) => {
      const repu = db.get(`user_${interaction.user.id}.repu`)
      const coin = db.get(`user_${interaction.user.id}.coins`)
      const level = db.get(`user_${interaction.user.id}.lvl`)
      const his = db.get(`user_${interaction.user.id}.his`)

        interaction.reply({
            content: `**Nome: ${interaction.user.username}**
**Reputação: ${repu || 0}**
**Coins: ${coin || 0}**
**Level: ${level || 0}**
**Historia: ${his || "Sem historia"}**`,
            ephemeral: false
        })
    }
}