import React from "react";
import { FaCheck } from "react-icons/fa";

function CreateNote({ title, body, onTitleChange, onBodyChange, onSubmit }) {
    return (
        <form className="add-new-page">
            <div className="add-new-page__input">
                <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={title}
                    placeholder="Catatan rahasia"
                    className="add-new-page__input__title" 
                    onChange={onTitleChange}
                />
                <textarea 
                    type="text" 
                    name="body" 
                    id="body" 
                    value={body}
                    placeholder="Sebenarnya saya adalah ..."
                    onChange={onBodyChange}
                    className="add-new-page__input__body"
                />
            </div>
            <div className="add-new-page__action">
                <button type="button" title="Simpan" className="action" onClick={onSubmit}>
                    <FaCheck />
                </button>
            </div>
        </form>
    );
}

export default CreateNote;