const Discord = module.require("discord.js"),
  fs = require("fs");

module.exports.run = async (client, message, args, prefix) => {
  const exampleEmbed = new Discord.MessageEmbed()
    .setTitle(`Hello, ${args[0].username}!`) // Название эмбэд сообщения
    .setAuthor(message.guild.name) // Автором будет название сервера
    .setDescription(`${''}`) // комментарий // можно задать любой
    .setTimestamp() // Дата  отправки сообщения
    .setFooter("© Boris 2021");

  message.channel.send(exampleEmbed); // Отправляем сообщение
};
module.exports.help = {
  name: "hi", // Название команды
  description: "Бот поприветствует Вас." //Описание команды
};
