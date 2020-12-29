import "./App.css";
import React from "react";

import { initialState } from "./initialState";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    //lifecycle methods
    componentDidMount() {
        this.setState({
            activeTasks: this.state.allTasks.find(
                (task) => task.name === "Backlog"
            ).issues.length,
            finishedTasks: this.state.allTasks.find(
                (task) => task.name === "Finished"
            ).issues.length,
        });
    }

    openInput = (tasksId) => {
        console.log("block ", tasksId);
        const currentTasks = this.state.allTasks.find(
            (task) => task.id === tasksId
        ).name;

        console.log(currentTasks);
    };

    //render

    render() {
        return (
            <div className="app">
                <Header />
                <Main
                    allTasks={this.state.allTasks}
                    openInput={this.openInput}
                />
                <Footer
                    activeTasks={this.state.activeTasks}
                    finishedTasks={this.state.finishedTasks}
                />
            </div>
        );
    }
}

export default App;
