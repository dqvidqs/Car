import React from 'react';
import Greetings from "./HomePage/Greetings";
import NavBar from "./HomePage/NavBar";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <NavBar/>
                {this.props.children}
            </div>
        );
    };
}

export default App;
