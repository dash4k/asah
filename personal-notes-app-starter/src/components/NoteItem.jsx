import React from "react";
import { Link } from "react-router-dom";
import { showFormattedDate } from "../utils";

function NoteItem({ id, title, createdAt, body }) {
    return (
        <section className="note-item">
            <h3 className="note-item__title">
                <Link to={`/notes/${id}`}>{title}</Link>
            </h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">
                {body.length > 100 ? body.slice(0, 100) + "..." : body}
            </p>
        </section>
    )
}

export default NoteItem;