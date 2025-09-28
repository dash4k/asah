import React from "react";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
    if (!notes.length) {
        return (
            <section className="notes-list">
                <p>Not a single note is found in the database.</p>
            </section>
        );
    } else {
        return (
            <section className="notes-list">
                {notes.map((note) => {
                    return <NoteItem key={note.id} {...note} />
                })}
            </section>
        );
    }
}

export default NoteList;