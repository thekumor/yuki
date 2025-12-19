const { SlashCommandBuilder } = require('discord.js');
const { api } = require('./config.json');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder().setName('gif')
		.setDescription('Sends a gif.')
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('Type of gif.')
				.setRequired(true)
				.addChoices(
					{ name: 'Cat', value: 'cat' },
					{ name: 'Anime', value: 'anime' }
				),
		),

	async execute(interaction) {
		const key = api.tenor;
		const search = interaction.options.getString('type');

		try {
			const response = await axios.get(
				'https://tenor.googleapis.com/v2/search',
				{
					params: {
						q: search,
						key: key,
						client_key: 'yuki',
						limit: 4
					}
				},
			);

			if (!response.data.results.length)
				throw new Error('No gifs found');

			const gifResponse = response.data.results[0].media_formats.gif.url;
			await interaction.reply(gifResponse);
		} catch (error) {
			console.error(error);
		}
	}
};
