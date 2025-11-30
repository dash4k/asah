require('dotenv').config({ path: './.env' });
const amqp = require('amqplib');
const Listener = require('./Listener');
const MailSender = require('./MailSender');
const PlaylistsService = require('./PlaylistsService');

const init = async () => {
    const mailSender = new MailSender();
    const playlistsService = new PlaylistsService();
    const listener = new Listener(playlistsService, mailSender);

    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue('export:playlist', {
        durable: true,
    });

    channel.consume('export:playlist', listener.listen.bind(listener), { noAck: true });
};

init();
