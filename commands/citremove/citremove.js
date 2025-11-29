const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('citremove')
	.setDescription('Removes all citations from text (citations are in square brackets [], text is taken from sites like Wikipedia).')
	.addStringOption((option) => option.setName('message').setDescription('Text to de-citate.').setRequired(true)),

	async execute(interaction){
		var text = interaction.options.getString('message');
		
		for (var pos = text.search("["); pos != -1; pos = text.search("[")) {
			text = text.substring(0, pos) + text.substring(text.indexOf("]", pos) + 1);
		}
		
		interaction.reply(text);
	}
};
