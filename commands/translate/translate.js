// ================================================
// 
//	Project: Yuki
//
//	File: commands/translate/translate.js
//	Desc: Translates text to a given language.
// 
//	Modified: 2025/11/08 6:56 PM
//	Created: 2025/11/08 6:56 PM
//	Authors: The Kumor
// 
// ================================================

const { SlashCommandBuilder } = require('discord.js');
const translate = require('translate-google')

module.exports = {
	data: new SlashCommandBuilder().setName('translate')
	.setDescription('Translates text.')
	.addStringOption((option) => option.setName('text').setDescription('Text to translate').setRequired(true))
	.addStringOption((option) => option.setName('from').setDescription('From language').setRequired(true))
	.addStringOption((option) => option.setName('to').setDescription('To language').setRequired(true)),

	async execute(interaction){
		const text = interaction.options.getString('text');
		const from = interaction.options.getString('from');
		const to = interaction.options.getString('to');

		translate(text, {from: from, to: to}).then(res => {
			interaction.reply(res);
		}).catch(err => {
			console.error(err)
		})
	}
};
