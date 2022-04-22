const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: '[ℹ️ Info] Mostra o ping do bot.'
        })
    }

    run = (interaction) => {
        interaction.reply({
            content: `O ping do bot é \`${this.client.ws.ping}\`ms.`,
            ephemeral: true
        })
    }
}