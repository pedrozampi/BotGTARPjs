const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v9');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('relatorio')
		.setDescription('Imprime o relatório!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
        const Embed = new MessageEmbed()
        .setTitle('Relatório impresso!')
        .setDescription("O relatório esta em minha pasta principal.")
        .setColor("GREEN")
        .setThumbnail('https://cdn.discordapp.com/attachments/883067314818400317/992506890351284314/img-tabela.png');
        
        interaction.reply({embeds: [Embed]});
    }
}

