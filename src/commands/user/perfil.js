const Command = require('../../structures/Command')
const db = require('quick.db');
const { embad } = require('../../ultis')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'perfil',
            description: '[😉 Usuario] Mostra o perfil do usuario.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Escolher um usuario para ver o perfil.',
                    required: false
                }
            ]
        })
    }

    run = (interaction) => {


        if(!interaction.options.getUser('usuário')) {
            const repu = db.get(`user_${interaction.user.id}.repu`)
            const gold = db.get(`user_${interaction.user.id}.gold`)
            const deathCoin = db.get(`user_${interaction.user.id}.deathCoin`)
            const level = db.get(`user_${interaction.user.id}.lvl`)
            const his = db.get(`user_${interaction.user.id}.his`)
            const xp = db.get(`user_${interaction.id}.xp`)

            const e = embad({
                title:`Perfil de ${interaction.user.username}`,
                color:'#ffffff',
                filds: [
                    { name: 'Nome <a:person:966818919480451082>', value: `${interaction.user}`, inline: true },
                    { name: 'Level <:level:966818034998202428>', value: `${level || 0}`, inline: true },
                    { name: 'XP <:level:966818034998202428>', value: `${xp || 0}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Reputação <a:repu:966818035442810920>', value: `${repu || 0}`, inline: true },
                    { name: 'Gold Coins <a:Gold_Coin:966812927166398565>', value: `${gold || 0}`, inline: true },
                    { name: 'Death Coins <a:Death_Coin:966812927208341564>', value: `${deathCoin || 0}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Historia <:historia:966818065851506799>', value: `${his || "Sem historia"}`, inline: true },
                ]
            })

            interaction.reply({
                embeds: [e],
                ephemeral: false
            })
        } else {
            const user = interaction.options.getUser('usuário')
            const repu = db.get(`user_${user.id}.repu`)
            const gold = db.get(`user_${user.id}.gold`)
            const deathCoin = db.get(`user_${user.id}.deathCoin`)
            const level = db.get(`user_${user.id}.lvl`)
            const his = db.get(`user_${user.id}.his`)
            const xp = db.get(`user_${user.id}.xp`)

            const e = embad({
                title:`Perfil de ${user.username}`,
                color:'#ffffff',
                filds: [
                    { name: 'Nome <a:person:966818919480451082>', value: `${user}`, inline: true },
                    { name: 'Level <:level:966818034998202428>', value: `${level || 0}`, inline: true },
                    { name: 'XP <:level:966818034998202428>', value: `${xp || 0}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Reputação <a:repu:966818035442810920>', value: `${repu || 0}`, inline: true },
                    { name: 'Gold Coins <a:Gold_Coin:966812927166398565>', value: `${gold || 0}`, inline: true },
                    { name: 'Death Coins <a:Death_Coin:966812927208341564>', value: `${deathCoin || 0}`, inline: true },
                    { name: '\u200B', value: '\u200B' },
                    { name: 'Historia <:historia:966818065851506799>', value: `${his || "Sem historia"}`, inline: true },
                ]
            })

            interaction.reply({
                embeds: [e],
                ephemeral: false
            })
        }
      
    }
}
