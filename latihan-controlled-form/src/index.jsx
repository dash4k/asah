import React from "react";
import { createRoot } from 'react-dom/client';

// class NameForm extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: ''
//         };

//         this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
//     }

//     onEmailChangeHandler(event) {
//         this.setState(() => {
//             return {
//                 email: event.target.value
//             };
//         });
//     }

//     render() {
//         return (
//             <form>
//                 <input 
//                 type="text" 
//                 value={this.state.email}
//                 onChange={this.onEmailChangeHandler} 
//                 />
//             </form>
//         );
//     }
// }

class MyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            gender: 'Man',
        };

        this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
        this.onEmailChangeEventHandler = this.onEmailChangeEventHandler.bind(this);
        this.onGenderChangeEventHandler = this.onGenderChangeEventHandler.bind(this);
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
    }

    onNameChangeEventHandler(event) {
        this.setState(() => {
            return {
                name: event.target.value
            };
        });
    }

    onEmailChangeEventHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value
            };
        });
    }

    onGenderChangeEventHandler(event) {
        this.setState(() => {
            return {
                gender: event.target.value
            };
        });
    }

    onSubmitEventHandler(event) {
        event.preventDefault();

        const message = `
            Name: ${this.state.name}
            Email: ${this.state.email}
            Gender: ${this.state.gender}
        `;

        alert(message);
    }

    render() {
        return (
            <div>
                <h1>Register Form</h1>
                <form onSubmit={this.onSubmitEventHandler}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" value={this.state.name} onChange={this.onNameChangeEventHandler} type="text" />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input id="email" value={this.state.email} onChange={this.onEmailChangeEventHandler} type="text" />
                    <br />
                    <label htmlFor="gender">Gender: </label>
                    <select id="gender" value={this.state.gender} onChange={this.onGenderChangeEventHandler}>
                        <option value="Man">Man</option>
                        <option value="Woman">Woman</option>
                    </select>
                    <br />
                    <button type="submit">submit</button>
                </form>
            </div>
        );
    }
}

const root = createRoot(document.getElementById('root'));
// root.render(<NameForm />);
root.render(<MyForm />);