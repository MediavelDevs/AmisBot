const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'expulsar',
            description: '[💂 Moderação] Expulsa um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser expulso.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Motivo da expulsão.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({ content: 'Você precisa de permissão para expulsar membros no servidor.', ephemeral: true })

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se expulsar.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'Você só pode expulsar membros com cargo abaixo do seu.', ephemeral: true })
        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: 'Não consigo expulsar este usuário, o cargo dele não é mais baixo que o meu.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || 'Motivo não especificado.'

        interaction.guild.members.ban(user, { reason })
            .then(() => interaction.reply({ content: `Usuário \`${user.tag}\` expulso com sucesso!`, ephemeral: true }))
            .catch(() => interaction.reply({ content: 'Erro ao expulsar o usuário!', ephemeral: true }))
    }
}