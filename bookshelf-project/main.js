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

    function createBook(title, author, year, completed) {
        return {
            id: generateId(),
            title,
            author,
            year,
            completed,
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
        const completed = document.getElementById('bookFormIsComplete').checked;
        console.log(completed);

        const newBook = createBook(title, author, year, completed);
        books.push(newBook);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveBooks();
        bookForm.reset();
    });

    function makeBook(book) {
        const bookTitle = document.createElement('h3');
        bookTitle.setAttribute('dataTestId', 'bookItemTitle');
        bookTitle.innerText = book.title;

        const bookAuthor = document.createElement('p');
        bookAuthor.setAttribute('dataTestId', 'bookItemAuthor');
        bookAuthor.innerText = `Penulis: ${book.author}`;

        const bookYear = document.createElement('p');
        bookYear.setAttribute('dataTestId', 'bookItemYear');
        bookYear.innerText = `Tahun: ${book.year}`;

        const bookActions = document.createElement('div');
        bookActions.classList.add('actions');

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggleButton');
        toggleButton.setAttribute('dataTestId', 'bookItemIsCompleteButton');
        toggleButton.innerText = book.completed ? 'Belum Selesai dibaca' : 'Selesai dibaca';

        toggleButton.addEventListener('click', () => {
            book.completed = !book.completed;
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveBooks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.setAttribute('dataTestId', 'bookItemDeleteButton');
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
        editButton.setAttribute('dataTestId', 'bookItemEditButton');
        editButton.innerText = 'Edit Buku';

        editButton.addEventListener('click', () => {
            const newTitle = prompt('Judul baru:', book.title);
            const newAuthor = prompt('Penulis baru:', book.author);
            const newYear = prompt('Tahun baru:', book.year);

            if (newTitle && newAuthor && newYear) {
                book.title = newTitle;
                book.author = newAuthor;
                book.year = newYear;
                document.dispatchEvent(new Event(RENDER_EVENT));
                saveData();
            }
        });

        bookActions.append(toggleButton, deleteButton, editButton);

        const bookContainer = document.createElement('div');
        bookContainer.classList.add('books');
        bookContainer.setAttribute('data-bookid', book.id);
        bookContainer.setAttribute('dataTestId', 'bookItem');

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
        if (!book.completed) {
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
            if (book.completed) {
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