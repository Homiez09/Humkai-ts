import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { connect } from "mongoose";

module.exports = async (client: Client) => {
    //events
    readdirSync(`./src/events/`).forEach((dir) => {
        readdirSync(`./src/events/${dir}/`)
          .filter((e) => e.endsWith('ts'))
          .forEach((file) => {
            const evt = require(`../src/events/${dir}/${file}`);
            const eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
          });
      });
    console.log('✅', 'Loaded all events');

    //commands
    readdirSync(`./src/commands/`).forEach((dir) => {
        readdirSync(`./src/commands/${dir}/`)
          .filter((e) => e.endsWith('ts'))
          .forEach((file) => {
            const pull = require(`../src/commands/${dir}/${file}`);
            client.slash.set(pull.name, pull);
          });
      });
    console.log('✅', 'Loaded all commands');

    //mongodb connnect
    if (!process.env.dbURL)return console.log('The client is not connected to the database.');
    await connect(process.env.dbURL)
    console.log('Database connected.');

    console.log('---------------------------------------')
}