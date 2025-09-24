import React from "react";
import NotesButton from "./NotesButton";

class NotesInput extends React.Component {
    constructor(props) {
        super(props);

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
        this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this);
        this.onResetEventHandler = this.onResetEventHandler.bind(this);
        this.onArchivedEventHandler = this.onArchivedEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        if (event.target.value.length <= 50) this.props.setNote({ ...this.props.note, title: event.target.value });
    }

    onBodyChangeEventHandler(event) {
        this.props.setNote({ ...this.props.note, body: event.target.value });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();

        this.props.saveNote(this.props.note);
    }

    onDeleteEventHandler(event) {
        this.props.deleteNote(this.props.note.id);
    }

    onResetEventHandler(event) {
        this.props.setNote({
            id: null,
            title: '',
            body: '',
            archived: false,
            createdAt: '',
        });
    }

    onArchivedEventHandler() {
        this.props.toggleArchived(this.props.note.id);
    }

    render() {
        return (
            <form id="main-content" onSubmit={this.onSubmitEventHandler}>
                <h1 id="main-header">{this.props.note.id ? "Update Note" : "Add New Note"}</h1>
                <input 
                    id="title-input"
                    type="text" 
                    value={this.props.note.title} 
                    onChange={this.onTitleChangeEventHandler} 
                    placeholder="Title" 
                />
                <textarea 
                    id="body-input"
                    type="text" 
                    value={this.props.note.body} 
                    onChange={this.onBodyChangeEventHandler} 
                    placeholder="Body" 
                />
                <NotesButton 
                    id={this.props.note.id} 
                    onDelete={this.onDeleteEventHandler} 
                    onReset={this.onResetEventHandler} 
                    onArchived={this.onArchivedEventHandler}
                    archived={this.props.note.archived}
                />
            </form>
        );
    }
}

export default NotesInput;