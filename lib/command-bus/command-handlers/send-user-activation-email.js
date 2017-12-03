const usersRepo = require('../../repositories/users');
const mailer = require('../../helpers/emailer');
const env = require('../../config/env');

async function handle({}, { userId }) {
    if (!userId) {
        throw new Error('Missing user ID on payload');
    }

    const userDetails = await usersRepo.getUserById(userId);

    const locals = {
        user: {
            name: `${userDetails.first_name} ${userDetails.last_name}`,
            address: userDetails.email,
            activation_code: userDetails.activation_code,
        },
        urls: {
            website_root_url: env.URL_WEBSITE_ROOT,
            static_assets_root_url: env.URL_STATIC_ASSETS,
        },
    };

    const recipients = [
        {
            message: {
                to: locals.user,
                cc: 'bogdangabriel194@gmail.com',
            },
            view: 'activation-email',
        },
    ];

    mailer.sendMail({
        locals,
        recipients,
    });

    return Promise.resolve();
}

module.exports = {
    handle,
};