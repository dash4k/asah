import React from "react";
import ToggleTheme from "./components/ToggleTheme";
import { ThemeProvider } from "./contexts/ThemeContext";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: localStorage.getItem('theme') || 'light',
            toggleTheme: () => {
                this.setState((prevState) => {
                    const newTheme = prevState.theme === 'light' ? 'dark' : 'light';

                    localStorage.setItem('theme', newTheme);
                    
                    return {
                        theme: newTheme,
                    };
                });
            }
        };
    }

    componentDidMount() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            document.documentElement.setAttribute('data-theme', this.state.theme);
        }
    }
    
    render() {
        return (
            <ThemeProvider value={this.state}>
                <div className="container">
                    <ToggleTheme />
                    <p>Hello, {this.state.theme === 'light' ? 'Early Bird' : 'Night Owl'}</p>
                </div>
            </ThemeProvider>
        )
    }
}

export default App;