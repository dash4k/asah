document.addEventListener('DOMContentLoaded', () => {
    const books = [];
    const RENDER_EVENT = 'render-book';
    const SAVED_EVENT = 'saved-book';
    const STORAGE_KEY = 'BOOKSHELF_APPS';

    function storageExist() {
        if (typeof (Storage) === undefined) {
            return false;
        } else {
            return true;
        }
    }

    function generateId() {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
    }

    function createBook(title, author, year, isCompleted) {
        return {
            id: generateId(),
            title,
            author,
            year: parseInt(year),
            isCompleted,
        }
    }

    function findBookIndex(id) {
    return books.findIndex(book => book.id === id);
    }

    function saveBooks() {
        if (storageExist()) {
            const parsed = JSON.stringify(books);
            localStorage.setItem(STORAGE_KEY, parsed);
            document.dispatchEvent(new Event(SAVED_EVENT));
        }
    }

    function loadBooks() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);

        if (data !== null) {
            for (const book of data) {
                books.push(book);
            }
        }
    }

    const bookForm = document.getElementById('bookForm');
    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('bookFormTitle').value;
        const author = document.getElementById('bookFormAuthor').value;
        const year = document.getElementById('bookFormYear').value;
        const isCompleted = document.getElementById('bookFormIsComplete').checked;

        const newBook = createBook(title, author, year, isCompleted);
        books.push(newBook);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveBooks();
        bookForm.reset();
    });

    function makeBook(book) {
        const bookTitle = document.createElement('h3');
        bookTitle.setAttribute('data-testid', 'bookItemTitle');
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.setAttribute('data-testid', 'bookItemAuthor');
        bookAuthor.innerText = `Penulis: ${book.author}`;

        const bookYear = document.createElement('p');
        bookYear.setAttribute('data-testid', 'bookItemYear');
        bookYear.innerText = `Tahun: ${book.year}`;

        const bookActions = document.createElement('div');
        bookActions.classList.add('actions');

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggleButton');
        toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        toggleButton.innerText = book.isCompleted ? 'Belum Selesai dibaca' : 'Selesai dibaca';

        toggleButton.addEventListener('click', () => {
            book.isCompleted = !book.isCompleted;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveBooks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.innerText = 'Hapus Buku';

        deleteButton.addEventListener('click', () => {
            const bookIndex = findBookIndex(book.id);
            if (bookIndex !== -1) {
                books.splice(bookIndex, 1);
                document.dispatchEvent(new Event(RENDER_EVENT));
                saveBooks();
            }
        });

        const editButton = document.createElement('button');
        editButton.classList.add('editButton');
        editButton.setAttribute('data-testid', 'bookItemEditButton');
        editButton.innerText = 'Edit Buku';

        editButton.addEventListener('click', () => {
            const newTitle = prompt('Judul baru:', book.title);
            const newAuthor = prompt('Penulis baru:', book.author);
            const newYear = prompt('Tahun baru:', book.year);

            if (newTitle && newAuthor && newYear) {
                book.title = newTitle;
                book.author = newAuthor;
                book.year = parseInt(newYear);
                document.dispatchEvent(new Event(RENDER_EVENT));
                saveData();
            }
        });

        bookActions.append(toggleButton, deleteButton, editButton);

        const bookContainer = document.createElement('div');
        bookContainer.classList.add('books');
        bookContainer.setAttribute('data-bookid', book.id);
        bookContainer.setAttribute('data-testid', 'bookItem');

        bookContainer.append(bookTitle, bookAuthor, bookYear, bookActions);
        return bookContainer;
    }

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const query = document.getElementById('searchBookTitle').value.toLowerCase();
        const results = books.filter((book) => book.title.toLowerCase().includes(query));

        const incompleteBookList = document.getElementById('incompleteBookList');
        incompleteBookList.innerHTML = '';

        const completeBookList = document.getElementById('completeBookList');
        completeBookList.innerHTML = '';

        for (const book of results) {
        const bookElement = makeBook(book);
        if (!book.isCompleted) {
            incompleteBookList.append(bookElement);
        } else {
            completeBookList.append(bookElement);
        }
        }
    });

    document.addEventListener(RENDER_EVENT, () => {
        const incompleteBookList = document.getElementById('incompleteBookList');
        const completeBookList = document.getElementById('completeBookList');

        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';

        for (const book of books) {
            const bookElement = makeBook(book);
            if (book.isCompleted) {
                completeBookList.append(bookElement);
            } else {
                incompleteBookList.append(bookElement);
            }
        }
    });

    document.addEventListener(SAVED_EVENT, () => {
        console.log('Data berhasil disimpan.');
    });

    if (storageExist()) {
        loadBooks();
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
})