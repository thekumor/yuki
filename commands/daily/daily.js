// ================================================
// 
//	Project: Yuki
//
//	File: commands/daily/daily.js
//	Desc: Command for receiving daily money.
// 
//	Modified: 2025/12/27 3:06 PM
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
		const next = 24 * 60 * 60;

		const lastDaily = await yukidb.Get(interaction.guild.id, interaction.user, 'economy', 'lastDaily');
		const serverName = guildID[interaction.guild.id];

		const currency = database.settings[serverName].currency;

		if (lastDaily + next < start) {
			await yukidb.Add(interaction.guild.id, interaction.user, 'economy', 'money', 500);
			await yukidb.Set(interaction.guild.id, interaction.user, 'economy', 'lastDaily', start);

			const nextTake = new Date((start + next) * 1000).toLocaleString();

			await interaction.reply(`You received 500 ${currency}! Next take: ${nextTake}`);
		} else {
			const nextTake = new Date((lastDaily + next) * 1000).toLocaleString();
			await interaction.reply(`You can't receive daily ${currency}. Next take: ${nextTake}`);
		}
	}
};