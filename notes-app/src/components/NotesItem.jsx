import React from "react";

function NotesItem({ id, title, body, createdAt, onSelect }) {
    return (
        <article className="notes-item" onClick={() => onSelect(id)}>
            <span className="notes-item-createdAt">{createdAt}</span>
            <h3 className="notes-item-title">{title}</h3>
            <p className="notes-item-body">{body}</p>
        </article>
    );
}

export default NotesItem;