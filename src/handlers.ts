import { Client } from 'discord.js';
import { readdirSync } from 'fs';

module.exports = (client: Client) => {
    const folderEvent = readdirSync('./src/events')
    folderEvent.map(async (dir) => {
        const eName = readdirSync(`./src/events/${dir}/`).map(async (file) => {
            const evt = require(`../src/events/${dir}/${file}`);
            const eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
            console.log(`Loaded event: ${eName}`);
        })
    })

    console.log('Loading commands...');
    const folderCommand = readdirSync('./src/commands')
    console.log(folderCommand)
    folderCommand.map(async (dir) => {
        console.log('Loading commands...');
        const commands = readdirSync(`./src/commands/${dir}/`).map(async (cmd) => {
            const pull = require(`../src/commands/${dir}/${cmd}`);
            client.slash.set(pull.name, pull);
            console.log(`Loaded command: ${pull.name}`);
        })
    });


}