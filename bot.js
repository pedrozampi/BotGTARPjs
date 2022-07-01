const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Collection} = require('discord.js');
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
var relatorio = require('./relatorio.json');
var autor;
var nome;

const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Pontos da semana');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
      
      nome = interaction.member.user.username;
      var hora = new Date();
      const Embed = new MessageEmbed()
      .setDescription("Ponto fechado em " + hora.getDate() + '/' + hora.getMonth()+1 + ' as ' + hora.getHours() + ':' + hora.getMinutes() + ":" + hora.getSeconds())
      .setColor("RED")
      .setTitle(nome)
      .setThumbnail(interaction.member.user.avatarURL());

      inserirRelatorio(nome, Tt[interaction.member.id].toString());
      console.log(Tt[interaction.member.id]);
      interaction.reply({embeds: [Embed]});

    }else {

      interaction.reply("Você não é o autor deste ponto!");

    }
  }
  if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
    if(interaction.commandName == 'ponto'){
      autor = interaction.member.id;
      nome = interaction.member.user.username;
      var before = new Date();
      usuario[autor] = new Array(autor);
      Tt[autor] = new Array(before.getDate() + "/" + before.getMonth() +  " " + before.getHours() + ":" + before.getMinutes() + ":" + before.getSeconds());
      const Embed = new MessageEmbed()
      .setDescription("Ponto aberto em "+ before.getDate() + '/' + before.getMonth() + ' as ' + before.getHours() + ':' + before.getMinutes() + ":" + before.getSeconds())
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

    }else if(interaction.commandName = 'relatorio'){
      inserirEntrada();
      
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
  const saida = String(now.getDate() + "/" + now.getMonth() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
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
  const saida = String(now.getDate()+ "/" + now.getMonth() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds());
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


client.login('NTg5NTc1Njk2OTcyNzc1NDM0.GBEEof.YL32zD0FvrxvZXyNNCq2Jsw9okpAw9EuWHS7PE');