const { IncomingWebhook } = require("@slack/webhook");

const slackHook = new IncomingWebhook(process.env.SLACK_URL);

const loggerStream = {
    write: async (message) => {
        await slackHook.send({
            text: message,
        });
    },
};


module.exports = { loggerStream }