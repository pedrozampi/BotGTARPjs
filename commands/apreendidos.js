const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents ,MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v9');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apreendidos')
		.setDescription('Notifica os itens apreendidos.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addStringOption(advr => advr.setName('apreendidos').setDescription('Itens apreendidos.').setRequired(true)),
	async execute(interaction) {
        var apreendidos = String;
        apreendidos = interaction.options.getString('apreendidos');
        var apreendidos_sep = new Array(); 
        apreendidos_sep = apreendidos.split(",")

		var advEmbed = new MessageEmbed()
        .setTitle(`Apreensão`)
        .setDescription(`Itens apreendidos`)
        .setColor('RED')
        .setThumbnail('https://media0.giphy.com/media/elHDhmQ4GDHIUAWPNs/giphy.gif?cid=ecf05e47mouroevitgbi2l65uk63ew8gefxum7dn8mu45fjo&rid=giphy.gif&ct=g');

        interaction.reply({embeds: [advEmbed]});
	},
};