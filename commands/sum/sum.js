const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('sum')
	.setDescription('Sums numbers up.')
	.addStringOption((option) => option.setName('numbers').setDescription('Numbers to be summed.')),

	async execute(interaction){
		let sum = 0;
		const input = interaction.options.getString('numbers') ?? '0';
		let nums = input.split(' ');

		for (let i = 0; i < nums.length; i++){
			let toInt = parseInt(nums[i]);
			if (isNaN(toInt)) toInt = 0;
			sum += toInt;
		}

		await interaction.reply('Sum is: ' + sum);
	}
};
