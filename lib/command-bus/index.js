const cc = require('change-case');

const logger = require('../helpers/logger');

const registeredCommands = {
    ACTIVATE_USER: 'ACTIVATE_USER',
    CREATE_PROJECT: 'CREATE_PROJECT',
    CREATE_USER: 'CREATE_USER',
    INITIALIZE_USER_PASSWORD_RESET: 'INITIALIZE_USER_PASSWORD_RESET',
    LOGOUT_USER: 'LOGOUT_USER',
    RESET_USER_PASSWORD: 'RESET_USER_PASSWORD',
    SEND_PASSWORD_RESET_EMAIL: 'SEND_PASSWORD_RESET_EMAIL',
    SEND_PASSWORD_RESET_NOTIFICATION_EMAIL: 'SEND_PASSWORD_RESET_NOTIFICATION_EMAIL',
    SEND_USER_ACTIVATION_EMAIL: 'SEND_USER_ACTIVATION_EMAIL',
    SET_USER_REMEMBER_ME: 'SET_USER_REMEMBER_ME',
    UPDATE_USER_PROFILE: 'UPDATE_USER_PROFILE',
};

const commandNames = Object.keys(registeredCommands);

async function handle(command, context, payload) {
    async function handleCommandOnNextTick(handler) {
        let resolver;
        let rejecter;

        const p = new Promise((resP, rejP) => {
            resolver = resP;
            rejecter = rejP;
        });

        process.nextTick(async () => {
            try {
                resolver(await handler.handle(context || {}, payload, { handle }));
            } catch (err) {
                rejecter(err);
            }
        });

        return p;
    }

    if (cc.constantCase(command) !== command) {
        return Promise.reject(new Error(`Invalid command name: ${command}`));
    }

    if (commandNames.indexOf[command] === -1) {
        return Promise.reject(new Error(`Unknown command: ${command}`));
    }

    try {
        // For now, load the command handlers on-demand
        // eslint-disable-next-line global-require,import/no-dynamic-require
        const commandHandler = require(`./command-handlers/${cc.paramCase(command)}`);
        logger.debug(`Handling command ${command}`);
        try {
            // If no context is provided, send an empty object since destructuring will occur
            return handleCommandOnNextTick(commandHandler);
        } catch (err) {
            logger.debug(`Handling of command ${command} failed`, err);
            return Promise.reject(err);
        }
    } catch (err) {
        return Promise.reject(new Error(`Command handler could not be loaded for command: ${command}`));
    }
}

module.exports = {
    handle,
    commands: registeredCommands,
};