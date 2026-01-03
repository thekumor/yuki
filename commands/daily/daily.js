// ================================================
// 
//	Project: Yuki
//
//	File: commands/daily/daily.js
//	Desc: Command for receiving daily money.
// 
//	Modified: 2026/01/03 7:10 PM
//	Created: 2025/12/26 7:13 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
const { database, guildID } = require('../../config.json');
var yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder().setName('daily').setDescription('Gives you daily money.'),
	async execute(interaction) {
		const start = Math.floor(Date.now() / 1000);

		const now = new Date();
		const nextMidnight = new Date(
			now.getFullYear(),
			now.getMonth(),
			now.getDate() + 1,
			0, 0, 0, 0
		);
		const nextTime = nextMidnight.getTime() / 1000;

		const lastDaily = await yukidb.Get(interaction.guild.id, interaction.user, 'economy', 'lastDaily');
		const serverName = guildID[interaction.guild.id];

		const currency = database.settings[serverName].currency;

		if (nextTime < start) {
			await yukidb.Add(interaction.guild.id, interaction.user, 'economy', 'money', 500);
			await yukidb.Set(interaction.guild.id, interaction.user, 'economy', 'lastDaily', start);

			const nextTake = nextMidnight.toLocaleString();

			await interaction.reply(`You received 500 ${currency}! Next take: ${nextTake}`);
		} else {
			const nextTake = new Date((lastDaily + next) * 1000).toLocaleString();
			await interaction.reply(`You can't receive daily ${currency}. Next take: ${nextTake}`);
		}
	}
};