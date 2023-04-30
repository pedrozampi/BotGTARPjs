const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voo')
		.setDescription('Inicia seu voo.')
		.addUserOption(atir1 => atir1.setName('atirador1').setDescription('O atirador 1').setRequired(true))
		.addUserOption(copilot => copilot.setName('copilto').setDescription('O co-piloto'))
		.addUserOption(atir2 => atir2.setName('atirador2').setDescription('O atirador 2')),
	async execute(interaction) {
		return;
	},
};