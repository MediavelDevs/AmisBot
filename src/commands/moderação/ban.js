const Command = require('../../structures/Command')

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            description: '[💂 Moderação] Bane um usuário do servidor.',
            options: [
                {
                    name: 'usuário',
                    type: 'USER',
                    description: 'Usuário a ser banido.',
                    required: true
                },
                {
                    name: 'motivo',
                    type: 'STRING',
                    description: 'Motivo do ban.',
                    required: false
                }
            ]
        })
    }

    run = async (interaction) => {
        if (!interaction.member.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Você precisa de permissão para banir membros no servidor.', ephemeral: true })

        const user = interaction.options.getUser('usuário')
        if (interaction.user.id === user.id) return interaction.reply({ content: 'Você não pode se banir.', ephemeral: true })

        const member = interaction.guild.members.cache.get(user.id)
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: 'Você só pode banir membros com cargo abaixo do seu.', ephemeral: true })
        if (interaction.guild.me.roles.highest.position <= member.roles.highest.position) return interaction.reply({ content: 'Não consigo banir este usuário, o cargo dele não é mais baixo que o meu.', ephemeral: true })

        const reason = interaction.options.getString('motivo') || 'Motivo não especificado.'

        interaction.guild.members.ban(user, { reason })
            .then(() => interaction.reply({ content: `Usuário \`${user.tag}\` banido com sucesso!`, ephemeral: true }))
            .catch(() => interaction.reply({ content: 'Erro ao banir o usuário!', ephemeral: true }))
    }
}