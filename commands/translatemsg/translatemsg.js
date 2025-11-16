const { SlashCommandBuilder } = require('discord.js');
const translate = require('translate-google')

module.exports = {
	data: new SlashCommandBuilder().setName('translatemsg')
	.setDescription('Translates a message.')
	.addStringOption((option) => option.setName('message').setDescription('Message (ID) to translate').setRequired(true))
	.addStringOption((option) => option.setName('from').setDescription('From language').setRequired(true))
	.addStringOption((option) => option.setName('to').setDescription('To language').setRequired(true)),

	async execute(interaction){
		const text = interaction.options.getString('text');
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
