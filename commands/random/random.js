const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('random')
	.setDescription('Generates a random number.')
	.addStringOption((option) => option.setName('min').setDescription('Lowest number to generate from.'))
	.addStringOption((option) => option.setName('max').setDescription('Highest number to generate from.')),

	async execute(interaction){
		const minNumber = parseFloat(interaction.options.getString('min') ?? '0');
		const maxNumber = parseFloat(interaction.options.getString('max') ?? '100');

		const min = isNaN(minNumber) ? 0 : minNumber;
		const max = isNaN(maxNumber) ? 100 : maxNumber;

		const rand = Math.floor(Math.random() * (max - min) + min);

		await interaction.reply('Random number(' + min + ' - ' + max + '): ' + rand);
	}
};
