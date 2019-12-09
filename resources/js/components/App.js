import React from 'react';
import NavBar from "./HomePage/NavBar";
import Footer from "./HomePage/Footer";

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <NavBar/>
                {this.props.children}
                <Footer/>
            </div>
        );
    };
}

export default App;
