import React from "react";
import { createRoot } from 'react-dom/client';

// class MyComponent extends React.Component {
//     constructor(props) {
//         super(props);
//     }
    
//     render() {
//         return <p>Hello, {this.props.name}!</p>;
//     }
// }

// const root = createRoot(document.getElementById('root'));
// root.render(
//     <div>
//         <MyComponent name="Dicoding" />
//         <MyComponent name="John" />
//         <MyComponent name="Doe" />
//     </div>
// );

function CounterDisplay({ count }) {
  if (count === 0) {
    return <p>{count}</p>;
  }
 
  if (count % 5 === 0 && count % 7 === 0) {
    return <p>FizzBuzz</p>;
  }
 
  if (count % 5 === 0) {
    return <p>Fizz</p>;
  }
 
  if (count % 7 === 0) {
    return <p>Buzz</p>;
  }
 
  return <p>{count}</p>;
}

function IncreaseButton({ increase }) {
    return (
        <div>

            <button onClick={increase}>+ increase</button>
        </div>
    )
}

function ResetButton({ reset }) {
    return (
        <div>

            <button onClick={reset}>+ reset</button>
        </div>
    )
}

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        };

        this.onIncreaseEventHandler = this.onIncreaseEventHandler.bind(this);
        this.onResetEventHandler = this.onResetEventHandler.bind(this);
    }

    onIncreaseEventHandler() {
        this.setState((previousState) => {
            return {
                count: previousState.count + 1
            };
        });
    }

    onResetEventHandler() {
        this.setState(() => {
            return {
                count: 0
            };
        });
    }

    render() {
        return (
            <div>
                <IncreaseButton increase={this.onIncreaseEventHandler} />
                <CounterDisplay count={this.state.count} />
                <ResetButton reset={this.onResetEventHandler} />
            </div>
        );
    }
}

const root = createRoot(document.getElementById('root'));
root.render(<Counter />);