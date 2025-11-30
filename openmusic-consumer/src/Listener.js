class Listener {
    constructor(playlistsService, mailSender) {
        this._playlistsService = playlistsService;
        this._mailSender = mailSender;
    }

    async listen(message) {
        try {
            const { playlistId, targetEmail, userId } = JSON.parse(message.content.toString());

            const { name } = await this._playlistsService.getPlaylistById(playlistId);
            const songs = await this._playlistsService.getPlaylistSongsById(playlistId);

            const attachment = {
                playlist: {
                    id: playlistId,
                    name,
                    songs,
                },
            }

            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(attachment));
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Listener;
