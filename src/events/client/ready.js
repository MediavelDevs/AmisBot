const Event = require('../../structures/Event')

module.exports = class extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        })
    }

    run = async () => {
        let activities = ["Rainha das Rainhas ;)", "Vamos Jogar?", "Meu Criador: @Orochiin"],
        i = 0;
        setInterval(
            () =>
                this.client.user.setActivity(`${activities[i++ % activities.length]}`, {
                    type: 'STREAMING',
                    url: 'https://www.twitch.tv/Alanzoka'
                }),
            1000 * 60
        );
        this.client.user.setStatus('dnd')
        console.log(`Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`)
        this.client.registryCommands()
    }
}