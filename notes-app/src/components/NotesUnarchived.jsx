import React from "react";
import NotesItem from "./NotesItem";

function NotesUnarchived({ notes, onSelect }) {
    const unarchivedNotes = notes.filter((note) => note.archived === false);
    return (
        <section id="notes-unarchived" className="notes-section">
            <h2 className="notes-section-heading">Unarchived Notes</h2>
            {
                unarchivedNotes.length > 0 
                ? unarchivedNotes.map((note) => (
                    <NotesItem 
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        body={note.body}
                        createdAt={note.createdAt}
                        onSelect={onSelect}
                    />
                ))
                : <p>No Unarchived Notes</p>
            }
        </section>
    )
}

export default NotesUnarchived;