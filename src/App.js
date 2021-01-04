import "./App.css";
import React from "react";

import { initialState } from "./initialState";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import TaskInfo from "./Components/TaskInfo/TaskInfo";
import { BrowserRouter, Switch, Route } from "react-router-dom";

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

    //own methods
    //after addButton clicked
    openInput = (tasksId) => {
        const allTasksArray = this.state.allTasks;
        const newAllTasks = [
            ...allTasksArray.slice(0, tasksId),
            { ...allTasksArray[tasksId], isAbbButtonClicked: true },
            ...allTasksArray.slice(tasksId + 1),
        ];
        this.setState({ allTasks: newAllTasks });
    };

    //after dropdown-item clicked: push new issue in array, set isAddButtonClicked: false, delete this item from previous tasks
    replaceTasksIssue = (issueTitle, tasksId) => {
        const tasksIssues = this.state.allTasks[tasksId].issues.slice();
        const tasksLength = tasksIssues.length;
        const tasksLastId = tasksLength ? tasksIssues[tasksLength - 1].id : -1;
        const issueInPrevTasks = this.state.allTasks[tasksId - 1].issues.find(
            (issue) => issue.title === issueTitle
        );
        const newActiveTasks =
            (tasksId === 1 && this.state.activeTasks - 1) ||
            this.state.activeTasks;
        const newFinishedTasks =
            (tasksId === 3 && this.state.finishedTasks + 1) ||
            this.state.finishedTasks;
        const newAllTasks = [
            ...this.state.allTasks.slice(0, tasksId - 1),
            {
                ...this.state.allTasks[tasksId - 1],
                issues: this.state.allTasks[tasksId - 1].issues.filter(
                    (issue) => issue.id !== issueInPrevTasks.id
                ),
            },
            {
                ...this.state.allTasks[tasksId],
                isAbbButtonClicked: false,
                issues: [
                    ...this.state.allTasks[tasksId].issues,
                    { ...issueInPrevTasks, id: tasksLastId + 1 },
                ],
            },
            ...this.state.allTasks.slice(tasksId + 1),
        ];
        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
        this.setState({
            allTasks: newAllTasks,
            activeTasks: newActiveTasks || this.state.activeTasks,
            finishedTasks: newFinishedTasks || this.state.finishedTasks,
        });
    };

    //the first task: after Submit clicked: push new issue in array, set isAddButtonClicked: false
    addNewTasksIssue = (newIssueTitle) => {
        const tasksIssues = this.state.allTasks[0].issues.slice();
        const tasksLength = tasksIssues.length;
        const tasksLastId = tasksLength ? tasksIssues[tasksLength - 1].id : -1;

        const newActiveTasks = this.state.activeTasks + 1;

        const newIssue = {
            id: tasksLastId + 1,
            title: newIssueTitle,
            body: "",
            createTime: new Date().toLocaleString(),
        };

        const newAllTasks = [
            {
                ...this.state.allTasks[0],
                isAbbButtonClicked: false,
                issues: [...this.state.allTasks[0].issues, newIssue],
            },
            ...this.state.allTasks.slice(1),
        ];

        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
        this.setState({
            allTasks: newAllTasks,
            activeTasks: newActiveTasks || this.state.activeTasks,
        });
    };

    toggleMenuBlock = () => {
        this.setState({ isMenuVisible: !this.state.isMenuVisible });
    };
    //render

    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Header
                        isMenuVisible={this.state.isMenuVisible}
                        toggleMenuBlock={this.toggleMenuBlock}
                    />
                    <Switch>
                        <Route
                            path="/taskinfo"
                            render={() => (
                                <TaskInfo allTasks={this.state.allTasks} />
                            )}
                        />
                        <Route
                            path="/"
                            render={() => (
                                <Main
                                    allTasks={this.state.allTasks}
                                    openInput={this.openInput}
                                    addNewTasksIssue={this.addNewTasksIssue}
                                    replaceTasksIssue={this.replaceTasksIssue}
                                />
                            )}
                        />
                    </Switch>
                    <Footer
                        activeTasks={this.state.activeTasks}
                        finishedTasks={this.state.finishedTasks}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
