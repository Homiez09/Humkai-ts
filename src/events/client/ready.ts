import { Client } from 'discord.js';

module.exports = (client: Client) => {
    console.log(client.user?.tag)
    client.users.fetch(process.env.OWNER_ID || '').then((user) => {
        user.send(String(new Date()).split(' ', 5).join(' '));
    });

    let i = 0;
    setInterval(() => {
        let Act = [
            `${client.guilds.cache.map((guild) => guild.memberCount).reduce((a, b) => a + b, 0)} users`,
            `${client.guilds.cache.size} servers`,
            `Make With TypeScript`
        ];

        if (i > (Act.length-1)) i = 0;

        client.user?.setPresence({
            activities: [
                {
                    name: Act[i],
                    // Type --> PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM, COMPETING
                    type: 'WATCHING',
                },
            ],
            // Status --> online, idle, dnd, invisible
            status: 'online',
        });

        i++;
    }, 5000);
};
