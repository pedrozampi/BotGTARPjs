const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ausencia')
		.setDescription('Declara sua ausência.')
		.addStringOption(mot => mot.setName('motivo').setDescription('O motivo.').setRequired(true))
		.addStringOption(tem => tem.setName('tempo').setDescription('O tempo que vai ficar ausente.').setRequired(true))
		.addStringOption(pat => pat.setName('patente').setDescription('Sua patente').setRequired(true)),
	async execute(interaction) {
		var ausenciaEmbed = new MessageEmbed()
        .setTitle(`Ausência de ${interaction.member.nickname}`)
        .setDescription(`${interaction.member.user}`)
        .setColor("DARK_RED")
        .addFields(
            {name: 'Motivo:', value: interaction.options.getString('motivo'), inline: true},
            {name: 'Tempo:', value: interaction.options.getString('tempo'), inline: true},
            {name: 'Patente:', value: interaction.options.getString('patente'), inline: true}
        );
        interaction.reply({embeds: [ausenciaEmbed]});
	},
};