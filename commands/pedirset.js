const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pedirset')
		.setDescription('Pedir set de patente.')
		.addStringOption(pass => pass.setName('passaporte').setDescription('O motivo.').setRequired(true))
		.addRoleOption(set => set.setName('set').setDescription('O tempo que vai ficar ausente.').setRequired(true))
		.addUserOption(apr => apr.setName('aprovado').setDescription('Sua patente').setRequired(true)),
	async execute(interaction) {
        var passaporte = interaction.options.getString('passaporte');
        var set = interaction.options.getRole('set');
        var aprovado = interaction.options.getUser('aprovado')
		var pedirEmbed = new MessageEmbed()
        .setTitle(`Set de ${interaction.member.nickname}`)
        .setDescription(`${interaction.member.user}`)
        .setColor('YELLOW')
        .addFields(
            {name: 'Passaporte:', value: `${passaporte}`, inline: true},
            {name: 'Set:', value: `${set}`, inline: true},
            {name: 'Patente:', value: `${aprovado}`, inline: true}
        );

        interaction.reply({embeds: [pedirEmbed]});
	},
};