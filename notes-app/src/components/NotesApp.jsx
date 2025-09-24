import React from "react";
import NotesInput from "./NotesInput";
import NotesUnarchived from "./NotesUnarchived";
import NotesArchived from "./NotesArchived";
import NotesSearch from "./NotesSearch";

class NotesApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeNote: {
                id: null,
                title: "",
                body: "",
                archived: false,
                createdAt: "",
            },
            notes: [
                {
                    id: 1,
                    title: "Babel",
                    body: "Babel merupakan tools open-source yang digunakan untuk mengubah sintaks ECMAScript 2015+ menjadi sintaks yang didukung oleh JavaScript engine versi lama. Babel sering dipakai ketika kita menggunakan sintaks terbaru termasuk sintaks JSX.",
                    archived: false,
                    createdAt: '2022-04-14T04:27:34.572Z',
                },
            ],
            keyword: '',
        }

        this.setNote = this.setNote.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.toggleArchived = this.toggleArchived.bind(this);
        this.searchNote = this.searchNote.bind(this);
    }

    setNote(note) {
        this.setState({ activeNote: note });
    }

    saveNote({ id = null, title, body }) {
        if (id) {
            this.setState((prevState) => {
                const updatedNotes = prevState.notes.map((note) => {
                    if (note.id === id) return { ...note, title, body };
                    return note;
                });

                const updatedActiveNote =
                    prevState.activeNote.id === id
                        ? { ...prevState.activeNote, title, body }
                        : prevState.activeNote;

                return { 
                    notes: updatedNotes,
                    activeNote: updatedActiveNote,
                };
            });
        } else {
            const newNote = {
                id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
                title,
                body,
                archived: false,
                createdAt: new Date().toISOString(),
            };

            this.setNote({
                id: null,
                title: '',
                body: '',
                archived: false,
                createdAt: '',
            });

            this.setState((prevState) => ({
                notes: [...prevState.notes, newNote]
            }));
        }
    }

    deleteNote(id) {
        const newNotes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes: newNotes });
        this.setNote({
            id: null,
            title: '',
            body: '',
            archived: false,
            createdAt: '',
        });
    }

    toggleArchived(id) {
        this.setState((prevState) => {
            const updatedNotes = prevState.notes.map((note) => {
                if (note.id === id) return { ...note, archived: !note.archived};
                else return note;
            });
      
            const updatedActiveNote =
            prevState.activeNote.id === id
                ? { ...prevState.activeNote, archived: !prevState.activeNote.archived }
                : prevState.activeNote;

            return { 
                notes: updatedNotes,
                activeNote: updatedActiveNote,
            };
        });
    }

    searchNote(keyword) {
        this.setState({ keyword });
    }

    render() {
        const filteredNotes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.keyword.toLowerCase()));

        return (
            <main id="main-container">
                <section id="main-article">
                    <NotesInput 
                        note={this.state.activeNote}
                        setNote={this.setNote}
                        saveNote={this.saveNote}
                        deleteNote={this.deleteNote}
                        toggleArchived={this.toggleArchived}
                    />
                </section>
                <aside id="main-aside">
                    <NotesSearch searchNote={this.searchNote} />
                    <NotesUnarchived 
                        notes={filteredNotes} 
                        onSelect={(id) => {
                            const selectedNote = this.state.notes.find((note) => note.id === id);
                            if (selectedNote) this.setNote(selectedNote);
                        }}
                    />
                    <NotesArchived 
                        notes={filteredNotes} 
                        onSelect={(id) => {
                            const selectedNote = this.state.notes.find((note) => note.id === id);
                            if (selectedNote) this.setNote(selectedNote);
                        }}
                    />
                </aside>
            </main>
        );
    }
}

export default NotesApp;