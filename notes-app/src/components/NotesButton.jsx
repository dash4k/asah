import React from "react";

function NotesButton({ id=null, onDelete, onReset, onArchived, archived }) {
    if (id) {
        return (
            <fieldset id="form-buttons">
                <button type="submit" id="save-button">Save</button>
                <button type="button" id="reset-button" onClick={() => onReset()}>Reset</button>
                <button type="button" id="delete-button" onClick={() => onDelete(id)}>Delete</button>
                <button type="button" id="archive-button" onClick={onArchived}>{archived ? "Unarchive" : "Archive"}</button>
            </fieldset>
        );
    } else {
        return (
        <fieldset id="form-buttons">
                <button type="submit" id="save-button">Save</button>
                <button type="button" id="reset-button" onClick={() => onReset()}>Reset</button>
            </fieldset>
        );
    }
}

export default NotesButton;