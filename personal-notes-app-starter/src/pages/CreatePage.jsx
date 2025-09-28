import React from "react";
import { addNote } from "../utils/local-data";
import { useNavigate } from "react-router-dom";
import CreateNote from "../components/CreateNote";

function CreatePageWrapper() {
    const navigate = useNavigate();

    return <CreatePage navigate={navigate} />
}

class CreatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onTitleChangeEventHandler(event) {
        this.setState(() => {
            if (event.target.value.length > 20) {
                return
            }
            return {
                title: event.target.value,
            }
        });
    }

    onBodyChangeEventHandler(event) {
        this.setState(() => {
            if (event.target.value.length > 10000) {
                return
            }
            return {
                body: event.target.value,
            }
        });
    }

    onSubmitEventHandler() {
        addNote({
            title:this.state.title, 
            body:this.state.body
        });
        this.props.navigate('/');
    }

    render() {
        return (
            <CreateNote 
                title={this.state.title} 
                body={this.state.body} 
                onTitleChange={this.onTitleChangeEventHandler}
                onBodyChange={this.onBodyChangeEventHandler}
                onSubmit={this.onSubmitEventHandler}
            />
        );
    }
}

export default CreatePageWrapper;