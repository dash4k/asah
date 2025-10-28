const fs = require('fs');

const fsCallback = (error, data) => {
    if (error) {
        console.log('Gagal membaca berkas.');
        return;
    }

    console.log(data);
};

fs.readFile('notes.txt', 'utf-8', fsCallback);