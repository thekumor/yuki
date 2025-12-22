// ================================================
// 
//	Project: Yuki
//
//	File: commands/translatemsg/translatemsg.js
//	Desc: Translates text to a given language (from
//	an existing message).
// 
//	Modified: 2025/11/16 12:00 PM
//	Created: 2025/11/16 11:41 AM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
const translate = require('translate-google')

module.exports = {
	data: new SlashCommandBuilder().setName('translatemsg')
	.setDescription('Translates a message.')
	.addStringOption((option) => option.setName('message').setDescription('Message (ID) to translate').setRequired(true))
	.addStringOption((option) => option.setName('from').setDescription('From language').setRequired(true))
	.addStringOption((option) => option.setName('to').setDescription('To language').setRequired(true)),

	async execute(interaction){
		const text = interaction.options.getString('message');
		const from = interaction.options.getString('from');
		const to = interaction.options.getString('to');

		const message = await interaction.channel.messages.fetch(text);

		translate(message.content, {from: from, to: to}).then(res => {
			interaction.reply(res);
		}).catch(err => {
			console.error(err)
		})
	}
};
