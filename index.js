import { Client, GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

// Charger la config
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildInvites],
    partials: [Partials.GuildMember],
});

client.once("ready", async () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);

    client.guilds.cache.forEach(async guild => {
        try {
            const invites = await guild.invites.fetch();

            for (const invite of invites.values()) {
                if (shouldDeleteInvite(invite)) {
                    console.log(`🗑️ Suppression de l'invite ${invite.code} (${invite.url})`);
                    await invite.delete("Ne correspond pas aux critères config.json");
                }
            }
        } catch (err) {
            console.error(`Erreur avec ${guild.name}:`, err.message);
        }
    });
});

function shouldDeleteInvite(invite) {
    const rules = config.delete;

    if (rules.usedUp && invite.maxUses > 0 && invite.uses >= invite.maxUses) return true;
    if (rules.expired && invite.expiresAt && invite.expiresAt < new Date()) return true;
    if (rules.temporary && invite.temporary) return true;
    if (rules.byBots && invite.inviter && invite.inviter.bot) return true;
    if (rules.noChannel && !invite.channel) return true;
    if (rules.voiceChannel && invite.channel && invite.channel.type === 2) return true;
    if (rules.zeroUses && invite.uses === 0) return true;
    if (rules.permanent && invite.maxUses === 0 && !invite.expiresAt) return true;
    if (rules.olderThanDays && invite.createdAt && invite.createdAt < new Date(Date.now() - rules.olderThanDays * 86400000)) return true;
    if (rules.maxAgeSeconds && invite.maxAge > rules.maxAgeSeconds) return true;

    return false;
}

client.login(process.env.DISCORD_TOKEN);
