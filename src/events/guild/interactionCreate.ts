import { Client, CommandInteraction } from 'discord.js';

module.exports = async (client: Client, interaction: CommandInteraction) => {
    // slash Command Handling
    if (!interaction.isCommand()) return
    const command = client.slash.get(interaction.commandName);
    console.log(command)
    command.run(interaction, client);
}