const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('citremove')
	.setDescription('Removes citations from a given text.')
	.addStringOption((option) => option.setName('text').setDescription('Text to be de-cited.')),

	async execute(interaction){
		let text = interaction.options.getString('text');
		
		for (let i = text.indexOf('['); i !== -1; i = text.indexOf('[')){
			let j = text.indexOf(']', i);
			if (j === -1) continue;
			text = text.slice(0, i) + text.slice(j + 1);
		}

		await interaction.reply(text);
	}
};
