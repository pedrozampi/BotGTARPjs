const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Collection, Message} = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]});
const path = require('node:path');

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

var Tt = new Array();

// comando voo
var vooHora = new Array();
var cpilot = String;
var atir1 = String;
var atir2 = String;
var fimVoo = String;
var aVoo = String;

//relatorio
var relatorio = require('./relatorio.json');
var autor;
var nome;

const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Pontos da semana');

client.on('ready', () => {
  console.log(`${client.user.tag} operante!`);
  client.user.setActivity('Cuidando da papelada.', { type:'PLAYING'});
  client.user.setStatus('dnd');
  
});

const titulos = [
  "Nome",
  "Entrada",
  "Saida"
];

var usuario = new Array();

client.on('interactionCreate', async interaction => {

  if (interaction.isButton()){
    if(interaction.customId === `${interaction.member.id}-fechar-ponto` ){
      
      nome = interaction.member.nickname;
      var hora = new Date();
      const Embed = new MessageEmbed()
      .setDescription("Ponto fechado em " + hora.getDate() + '/' + (hora.getMonth()+1) + ' as ' + hora.getHours() + ':' + hora.getMinutes() + ":" + hora.getSeconds())
      .setColor("RED")
      .setTitle(nome)
      .setThumbnail(interaction.member.user.avatarURL());

      inserirRelatorio(nome, Tt[interaction.member.id].toString());
      interaction.reply({embeds: [Embed]});

    }else if(interaction.customId === `${interaction.member.id}-encerrar-voo`){
      var vooFim = new Date();
      fimVoo = vooFim.getHours() + ":" + vooFim.getMinutes(); 
      var vooEmbed = new MessageEmbed()
        .setTitle('Voo iniciado')
        .setDescription('Informações do voo:')
        .setColor("DARK_BLUE")
        .setThumbnail('https://media2.giphy.com/media/9DatA1LmRANoRTONwS/giphy.gif?cid=790b7611baca7fcbaf5131e1277767148b3a98620addb0b6&rid=giphy.gif&ct=g')
        .addFields(
          {name: 'QRA do piloto:', value: `${interaction.member}`, inline:true},
          {name: 'QRA do co-piloto:', value: `${cpilot}`, inline: true},
          {name: '\u200B', value:'\u200B'}
          )
          .addFields(
            {name: 'QRA do Atirador 1:', value: `${atir1}`, inline: true},
            {name: 'QRA do Atirador 2:', value: `${atir2}`, inline: true},
            {name: '\u200B', value:'\u200B'}
          )
          .addField('Hora do inicio do voo:',`${vooHora[interaction.member.id]}`, true)
          .addField('Hora de finalização do voo:',`${fimVoo}`, true);
      interaction.reply({embeds: [vooEmbed]});
      
    }else {

      interaction.reply("Você não é o autor deste comando!");

    }
  }
  if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
    if(interaction.commandName == 'ponto'){
      interaction.channelId = 
      autor = interaction.member.id;
      nome = interaction.member.nickname;
      var before = new Date();
      usuario[autor] = new Array(autor);
      Tt[autor] = new Array(before.getDate() + "/" + (before.getMonth()+1) +  " " + before.getHours() + ":" + before.getMinutes() + ":" + before.getSeconds());
      const Embed = new MessageEmbed()
      .setDescription("Ponto aberto em "+ before.getDate() + '/' + (before.getMonth()+1) + ' as ' + before.getHours() + ':' + before.getMinutes() + ":" + before.getSeconds())
      .setColor("GREEN")
      .setTitle(nome)
      .setThumbnail(interaction.member.user.avatarURL());

      const Row = new MessageActionRow();

          Row.addComponents(
          new MessageButton()
          .setCustomId(`${autor}-fechar-ponto`)
          .setStyle("DANGER")
          .setLabel("Fechar ponto")
          );
      interaction.reply({embeds: [Embed], components: [Row]});

    }else if(interaction.commandName == 'relatorio'){
      inserirEntrada();
      
      await command.execute(interaction);
    }else if(interaction.commandName == 'voo'){

      if(interaction.options.getUser('copilto') !== null){
        cpilot = interaction.options.getUser('copilto');
      }else{
        cpilot = "Sem";
      }
      if(interaction.options.getUser('atirador1') !== null){

        if(interaction.options.getUser('atirador2') !== null){
          atir1 = interaction.options.getUser('atirador1');
          atir2 = interaction.options.getUser('atirador2');
        }else{
          atir1 = interaction.options.getUser('atirador1');
          atir2 = 'Sem';
        }
      }else{
        interaction.reply("Necessario atirador!");
      }
      var horaVoo = new Date();
      vooHora[interaction.member.id] = horaVoo.getHours() + ":" + horaVoo.getMinutes(); 
      fimVoo = "...";

      var vooEmbed = new MessageEmbed()
        .setTitle('Voo iniciado')
        .setDescription('Informações do voo:')
        .setColor("BLUE")
        .setThumbnail('https://media2.giphy.com/media/9DatA1LmRANoRTONwS/giphy.gif?cid=790b7611baca7fcbaf5131e1277767148b3a98620addb0b6&rid=giphy.gif&ct=g')
        .addFields(
          {name: 'QRA do piloto:', value: `${interaction.member}`, inline:true},
          {name: 'QRA do co-piloto:', value: `${cpilot}`, inline: true},
          {name: '\u200B', value:'\u200B'}
          )
          .addFields(
            {name: 'QRA do Atirador 1:', value: `${atir1}`, inline: true},
            {name: 'QRA do Atirador 2:', value: `${atir2}`, inline: true},
            {name: '\u200B', value:'\u200B'}
          )
          .addField('Hora do inicio do voo:',`${vooHora[interaction.member.id]}`, true)
          .addField('Hora de finalização do voo:',`${fimVoo}`, true);
    
          
          
        var buttonVoo = new MessageActionRow();
        buttonVoo.addComponents(
          new MessageButton()
          .setCustomId(`${interaction.member.id}-encerrar-voo`)
          .setStyle("DANGER")
          .setLabel("Encerrar")
          );
          interaction.reply({embeds:[vooEmbed], components: [buttonVoo]});

    }else if(interaction.commandName == 'apreendidos'){
      var apreendidos = String;
      apreendidos = interaction.options.getString('apreendidos');
      var apreendidos_sep = new Array(); 
      apreendidos_sep = apreendidos.split(",");
      var channel = client.channels.cache.get(interaction.channelId);

      apreendidos_sep.forEach(function(item){
        channel.send(`> ***- ${item}***`);
      });
      await command.execute(interaction);
    }else{
      await command.execute(interaction);
    }
		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
 

});

function inserirRelatorio(nome, entrada){
  var now =  new Date();
  const saida = String(now.getDate() + "/" + (now.getMonth()+1) + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
  const data = {
      "nome": String(nome),
      "entrada": entrada,
      "saida": saida
    }
relatorio.push(data);
console.log(data);
fs.writeFile("relatorio.json", JSON.stringify(relatorio), err => {
  if (err) throw err; 
  console.log("Ponto incluído no relatorio.");
});
}

function inserirEntrada(){
  var now =  new Date();
  const saida = String(now.getDate()+ "/" + now.getMonth()+1 + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
  let headingColumnIndex = 1;
  titulos.forEach(heading =>{
    ws.cell(1, headingColumnIndex++).string(heading);
  });
  let rowIndex = 2;
  relatorio.forEach(record =>{
    let columnIndex = 1;
    Object.keys(record).forEach(columnName =>{
      ws.cell(rowIndex, columnIndex++).string(record[columnName])
    });
    rowIndex++;
  });
  console.log("Arquivo feito!");
  wb.write('relatorio.xlsx');
}


client.login('ODIyNDkwOTY1MjgwMjkyODY0.Gvhbos.1HGy5zzpUnX8pfaXdNvIRKMGmp7qNS2oLHgegs');