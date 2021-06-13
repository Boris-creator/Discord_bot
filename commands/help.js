const Discord = module.require("discord.js"),
  fs = require("fs");
  
module.exports.run = async (client, message, args, prefix) => {
    const arr = [...client.commands].map(comm => ({name: comm[0], description: comm[1].description}));
  const exampleEmbed = new Discord.MessageEmbed()
    .setTitle('Вот чему научился этот дурачок: \n'  + arr.map(comm => `${comm.name} --> ${comm.description}`).join('\n') + '\n Но это ещё не всё...') // Название эмбэд сообщения
    .setAuthor(message.guild.name) // Автором будет название сервера
    .setDescription(`${""}`) // комментарий
    .setTimestamp() // Дата  отправки сообщения
    .setFooter("© Boris 2021");

  message.channel.send(exampleEmbed); // Отправляем сообщение
};
module.exports.help = {
  name: "help", // Название команды
  description: "Бот расскажет, что он умеет делать.",
};
