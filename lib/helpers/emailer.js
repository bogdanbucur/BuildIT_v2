const path = require('path');

const logger = require('./logger');

const env = require('../config/env');

const nodemailer = require('nodemailer');

// TODO: move options to file
const options = {
    port: env.MG_PORT,
    host: env.MG_HOST,
    auth: {
        user: env.MG_USER,
        pass: env.MG_PASS,
    },
};
const transporter = nodemailer.createTransport(options);

const Email = require('email-templates');

const templatesDir = path.resolve(__dirname, '../..', 'emails');
const mailHelpers = {

    sendMail: (mailInfo) => {
        logger.info('this is MAILINFO', mailInfo);

        return Promise.all(mailInfo.recipients.map((recipient) => {
            // forced to create new instance of Email with each send by crabby caching of recipient address and subject
            const email = new Email({
                message: {
                    from: {
                        name: env.MG_NAME,
                        address: env.MG_ADDRESS,
                    },
                },
                views: {
                    root: templatesDir,
                    options: { extension: 'ejs' },
                },
                transport: transporter,
                juice: true,
                juiceResources: {
                    preserveImportant: true,
                    webResources: {
                        relativeTo: path.join(__dirname, '../..', 'emails/common'),
                    },
                },
            });
            return email.send({
                template: recipient.view,
                message: recipient.message,
                locals: mailInfo.locals,
            });
        }))
            .catch((err) => { logger.error('sendmail error', err); });
    },

};

module.exports = mailHelpers;