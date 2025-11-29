const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('citremove')
	.setDescription('Removes citations from a given text.')
	.addStringOption((option) => option.setName('text').setDescription('Text to be de-cited.')),

	async execute(interaction){
		let text = interaction.options.getString('text');
		let citationPattern = '/\s*\[.*?\]\s*/g';
		text = text.replace(citationPattern, ' ').trim();

		await interaction.reply(text);
	}
};
