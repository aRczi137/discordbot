const { Client, GatewayIntentBits, Events, Partials } = require("discord.js");
const keepAlive = require("./keepalive");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const TOKEN = process.env.DISCORD_TOKEN

keepAlive();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.once(Events.ClientReady, (c) => {
  console.log(`✅ Zalogowano jako ${c.user.tag}`);
});

client.on(Events.GuildMemberAdd, (member) => {
  const ch = member.guild.channels.cache.find((ch) => ch.name === "welcome");
  if (ch) ch.send(`Witaj, ${member.user}! 🎉`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.content.startsWith("!")) return;
  const args = message.content.slice(1).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();
  switch (cmd) {
    case "help":
      return message.channel.send(
        "Komendy: !help, !info, !regulamin, !clear, !ankieta",
      );
    case "info":
      return message.channel.send("Bot serwera #49 Dark War Survival.");
    case "regulamin":
      return message.channel.send(
        "1. Szacunek\n2. Bez spamu\n3. Nie przekraczaj granic",
      );
    case "clear":
      if (!message.member.permissions.has("ManageMessages")) return;
      const n = parseInt(args[0]);
      if (!n || n < 1 || n > 100)
        return message.reply("Podaj liczbę od 1 do 100.");
      await message.channel
        .bulkDelete(n)
        .catch(() => message.channel.send("Błąd czyszczenia."));
      break;
    case "ankieta":
      const q = args.join(" ");
      if (!q) return message.reply("Podaj pytanie.");
      const poll = await message.channel.send(`📊 **Ankieta:** ${q}`);
      await poll.react("👍");
      await poll.react("👎");
      break;
  }
});

client.login('MTM5MzM3NzAxNTA5NjQxMDE2Mw.GL3V0A.MKaN10n8KQqhdpBNormi-lMUC_M62mR1yv1Nd0');

