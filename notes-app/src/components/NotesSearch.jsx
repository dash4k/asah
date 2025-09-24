import React from "react";

function NotesSearch({ searchNote }) {
    return (
        <form>
            <input 
                type="text" 
                placeholder="Search Note(s)" 
                onChange={(event) => searchNote(event.target.value)} 
                id="search-bar" 
            />
        </form>
    );
}

export default NotesSearch;