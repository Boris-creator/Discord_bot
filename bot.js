const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const fetch = require("node-fetch");
const { ClientRequest } = require("http");
client.commands = new Discord.Collection(); // создаём коллекцию для команд

fs.readdir("./commands", (err, files) => {
  // чтение файлов в папке commands
  if (err) {
    console.log(err);
  }

  let jsfile = files.filter((f) => f.split(".").pop() === "js"); // файлы не имеющие расширение .js игнорируются
  if (!jsfile.length) return; // если нет ни одного файла с расширением .js

  console.log(`Загружено ${jsfile.length} команд`);
  jsfile.forEach((f, i) => {
    // добавляем каждый файл в коллекцию команд
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, {
      props: props,
      description: props.help.description,
    });
  });
});

client.on("ready", () => {
  console.log(`Бот ${client.user.username} запустился`);
});

client.on("message", (message) => {
  let prefix = config.prefix;
  if (
    !message.content.startsWith(prefix) ||
    /*message.author.bot*/ message.author.username == client.user.username
  )
    return;
  let messageArray = message.content.split(" ");
  let command = messageArray[0]; // команда после префикса
  let args = messageArray.slice(1).concat([{username: message.author.username}]); // аргументы после команды

  let command_file = client.commands.get(command.slice(prefix.length)); // получение команды из коллекции
  if (command_file) {
    command_file.props.run(client, message, args, prefix);
  }
});
client.login(config.token);
