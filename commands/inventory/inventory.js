// ================================================
// 
//	Project: Yuki
//
//	File: commands/inventory/inventory.js
//	Desc: Shows the user's inventory.
// 
//	Modified: 2026/01/02 11:23 PM
//	Created: 2026/01/02 11:13 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { database, guildID } = require('../../config.json');
// const yukidb = require('../../database.js');

module.exports = {
	data: new SlashCommandBuilder().setName('inventory').setDescription('Shows user\'s inventory.'),
	async execute(interaction){
		const embed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		await interaction.reply({ embeds: [embed] });
	}
};