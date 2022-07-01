const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ponto')
		.setDescription('Inicia seu ponto!'),
	async execute(interaction) {
      	return;
	},
};