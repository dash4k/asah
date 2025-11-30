const mapToDBAlbum = ({
    id,
    name,
    year,
    cover,
}) => ({
    id,
    name,
    year: Number(year),
    coverUrl: cover,
});

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

module.exports = { 
    mapToDBAlbum, 
    mapToDBSong,
}
