const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v9');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('advertencia')
		.setDescription('Adverter alguém.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addUserOption(advr => advr.setName('advertido').setDescription('O advertido.').setRequired(true))
        .addStringOption(type => type.setName('tipo').setDescription('Tipo da advertência.').setRequired(true))
        .addStringOption(mot => mot.setName('motivo').setDescription('Motivo da advertência.').setRequired(true))
		.addStringOption(ini => ini.setName('inicio').setDescription('Inicio da advertência.').setRequired(true))
        .addStringOption(fim => fim.setName('fim').setDescription('Fim da advertência.').setRequired(false)),
	async execute(interaction) {
        var advertido = interaction.options.getUser('advertido');
        var tipo = interaction.options.getString('tipo');
        var motivo = interaction.options.getString('motivo');
        var inicio = interaction.options.getString('inicio');
        var fim = String;
        if(interaction.options.getString('fim') !== null){
            fim = interaction.options.getString('fim');
        }else{
            fim = 'Indefinido.';
        }
		var advEmbed = new MessageEmbed()
        .setTitle(`Advertência`)
        .setDescription(`${advertido}`)
        .setColor('RED')
        .setThumbnail('https://media0.giphy.com/media/elHDhmQ4GDHIUAWPNs/giphy.gif?cid=ecf05e47mouroevitgbi2l65uk63ew8gefxum7dn8mu45fjo&rid=giphy.gif&ct=g')
        .addFields(
            {name: 'Quem advertiu:', value: `${interaction.member.user}`, inline: true},
            {name: 'Advertido:', value: `${advertido}`, inline: true},
            {name: 'Tipo:', value: `${tipo}`, inline: true},
            {name: '\u200B', value:'\u200B'},
            {name: 'Data do inicio', value:`${inicio}`, inline:true},
            {name: 'Data do fim', value: `${fim}`, inline: true}, 
        )
        .addField('Motivo', `${motivo}`, false);

        interaction.reply({embeds: [advEmbed]});
	},
};