const mapToDBAlbum = ({
    id,
    name,
    year,
}) => ({
    id,
    name,
    year: Number(year),
})

const mapToDBSong = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    album_id,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id ? album_id : null,
});

module.exports = { mapToDBAlbum, mapToDBSong }