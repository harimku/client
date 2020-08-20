import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    //initialize default state
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }
    
    //fetch data from the API and store the response to 'this.state.apiResponse'
    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }));
    }
    
    //React lifecycle method; executes callAPI method after the component mounts
    componentWillMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">;{this.state.apiResponse}</p>
            </div>
        );
    }
}

export default App;
