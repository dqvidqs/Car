import React from 'react';

class Greetings extends React.Component{
    render() {
        return (
            <div className="jumbotron">
                <h6>About</h6>
                <p>This system was created for education purpose</p>
                <p>Project was made by ReactJS and Laravel</p>
                <h6>System</h6>
                <p>Workers can create update delete cars posts</p>
                <p>Supervisor can watch workers, their activities, buyers</p>
                <p>Admin controls employees. He can create update delete employees profiles</p>
                <p>Users can order cars</p>
                <img className="img" src="http://127.0.0.1:8000/car.png"></img>
            </div>
        );
    }
}
export  default Greetings;
