import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { initialState } from "./redux/tasks-reducer";
import { countTasks } from "./common/countingTasks";
import HeaderContainer from "./Components/Header/HeaderContainer";
import FooterContainer from "./Components/Footer/FooterContainer";
import MainContainer from "./Components/Main/MainContainer";
import TaskInfoContainer from "./Components/TaskInfo/TaskInfoContainer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    changeIssueBody = (bodyText, issueId, taskName) => {
        const tasks = this.state.allTasks;

        const currentTask = tasks
            .slice()
            .find((task) => task.name === taskName);
        const currentTasksId = currentTask.id;

        const newAllTasks = [
            ...tasks.slice(0, currentTasksId),
            {
                ...tasks[currentTasksId],
                issues: currentTask.issues.map((issue) =>
                    issue.id === issueId ? { ...issue, body: bodyText } : issue
                ),
            },
            ...tasks.slice(currentTasksId + 1),
        ];

        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
        this.setState({ allTasks: newAllTasks });
    };

    deleteIssue = (issueId, taskName) => {
        const tasks = this.state.allTasks;

        const currentTask = tasks
            .slice()
            .find((task) => task.name === taskName);
        const currentTasksId = currentTask.id;

        const newAllTasks = [
            ...tasks.slice(0, currentTasksId),
            {
                ...tasks[currentTasksId],
                issues: currentTask.issues.filter(
                    (issue) => issue.id !== issueId
                ),
            },
            ...tasks.slice(currentTasksId + 1),
        ];

        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

        const newActiveTasks = countTasks(
            0,
            currentTasksId,
            this.state.activeTasks,
            false
        );
        const newFinishedTasks = countTasks(
            3,
            currentTasksId,
            this.state.finishedTasks,
            false
        );
        this.setState({
            allTasks: newAllTasks,
            activeTasks: newActiveTasks,
            finishedTasks: newFinishedTasks,
        });
    };

    //render
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <HeaderContainer />
                    <Switch>
                        <Route
                            path="/taskinfo"
                            render={() => <TaskInfoContainer />}
                        />
                        <Route path="/" render={() => <MainContainer />} />
                    </Switch>
                    <FooterContainer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
