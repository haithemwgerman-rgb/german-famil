const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages
  ]
});

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  if (!guild) return console.log("❌ السيرفر غير موجود أو ID خطأ");

  const rolesToCreate = [
    { name: "🔱 الملك", color: "#FFD700" },
    { name: "⚔️ القائد", color: "#FF0000" },
    { name: "💎 النخبة", color: "#00FFFF" },
    { name: "👑 العائلة المالكة", color: "#8A2BE2" },
    { name: "🎖️ الجندي", color: "#00FF00" },
  ];

  for (const role of rolesToCreate) {
    try {
      await guild.roles.create({
        name: role.name,
        color: role.color,
        reason: "Roles setup by Royal Bot",
      });
      console.log(`✅ تم إنشاء الرتبة: ${role.name}`);
    } catch (err) {
      console.error(`❌ خطأ في إنشاء ${role.name}:`, err);
    }
  }
});

client.login(process.env.TOKEN);
