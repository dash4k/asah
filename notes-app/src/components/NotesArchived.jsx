import React from "react";
import NotesItem from "./NotesItem";

function NotesArchived({ notes, onSelect }) {
    const archivedNotes = notes.filter((note) => note.archived === true);
    return (
        <section id="notes-unarchived" className="notes-section">
            <h2 className="notes-section-heading">Archived Notes</h2>
            {
                archivedNotes.length > 0 
                ? archivedNotes.map((note) => (
                    <NotesItem 
                        key={note.id}
                        id={note.id}
                        title={note.title}
                        body={note.body}
                        createdAt={note.createdAt}
                        onSelect={onSelect}
                    />
                ))
                : <p>No Archived Notes</p>
            }
        </section>
    )
}

<h2 className="notes-section-heading">Archived Notes</h2>
export default NotesArchived;