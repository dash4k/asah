import React from "react";
import { showFormattedDate } from "../utils";

function NoteDetails({ title, createdAt, body, archived }) {
    return (
        <>
            <p className="detail-page__archived">Status: {archived ? "Diarsipkan" : "Aktif"}</p>
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
            <div className="detail-page__body">{body}</div>
        </>
    )
}

export default NoteDetails;