# Bot de administração de grupo para GTA Roleplay

Esse chat bot foi desenvolvido para automatizar processos que eram feitos dentro do jogo por outros jogadores de forma manual, assim como por aqueles que administravam essas informações deveriam fazer relatórios de forma manual.

Feito em Node.js com os modulos:
Modulos|Uso
----------|-----
[File System](https://nodejs.org/api/fs.html)|Manipulação de arquivos JSON como banco de dados.
[Discord.js](https://discord.js.org/)|Modulo para interagir com a API do Discord
[Excel4node](https://www.npmjs.com/package/excel4node)|Modulo para a manipulação de arquivos do excel

## Comandos
- **/ponto:** Inicia um ponto/turno em que o mesmo esteve exercendo a sua função, o encerrando é incluido no JSON relatorio
- **/relatorio:** Lê os dados dentro do JSON relatorio e os transfere para uma tabela excel para melhor leitura.

- **/advertencia:** Informa o advertido, quem aplicou, tipo, inicio e fim.
- **/ausencia:** Informa quem estara ausente, motivo e datas
- **/voo:** Informa quando foi iniciado e encerrado o voô, assim como que estava a bordo
- **/apreendidos:** Informa os itens apreendidos.
- **/pedirset:** Faz um aviso requisitando que usuário receba determinada função ou cargo.

# Porque fiz o bot
Para a prática de minhas técnicas e estimulo a aprender tecnologias pego atividades do meu dia a dia como hobbies e busco fazer algum algoritmo que me ajude em algo ou apenas pela curiosidade.

Com o fim do grupo de pessoas as quais tinham a necessidade do Bot ele está em desuso, o principal comando dele não está funcionando mais e não estarei concertando.