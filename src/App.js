import "./App.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { initialState } from "./initialState";
import { countTasks } from "./common/countingTasks";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import TaskInfo from "./Components/TaskInfo/TaskInfo";

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
        const tasks = this.state.allTasks;
        const newAllTasks = [
            ...tasks.slice(0, tasksId),
            { ...tasks[tasksId], isAbbButtonClicked: true },
            ...tasks.slice(tasksId + 1),
        ];
        this.setState({ allTasks: newAllTasks });
    };

    //after dropdown-item clicked: push new issue in array, set isAddButtonClicked: false, delete this item from previous tasks
    replaceTasksIssue = (issueTitle, tasksId) => {
        const tasks = this.state.allTasks;
        const tasksIssues = tasks[tasksId].issues.slice();
        const tasksLength = tasksIssues.length;
        const tasksLastId = tasksLength ? tasksIssues[tasksLength - 1].id : -1;
        const issueInPrevTasks = tasks[tasksId - 1].issues.find(
            (issue) => issue.title === issueTitle
        );
        const newAllTasks = [
            ...tasks.slice(0, tasksId - 1),
            {
                ...tasks[tasksId - 1],
                issues: tasks[tasksId - 1].issues.filter(
                    (issue) => issue.id !== issueInPrevTasks.id
                ),
            },
            {
                ...tasks[tasksId],
                isAbbButtonClicked: false,
                issues: [
                    ...tasks[tasksId].issues,
                    { ...issueInPrevTasks, id: tasksLastId + 1 },
                ],
            },
            ...tasks.slice(tasksId + 1),
        ];
        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));

        const newActiveTasks = countTasks(
            1,
            tasksId,
            this.state.activeTasks,
            false
        );
        const newFinishedTasks = countTasks(
            3,
            tasksId,
            this.state.finishedTasks,
            true
        );

        this.setState({
            allTasks: newAllTasks,
            activeTasks: newActiveTasks,
            finishedTasks: newFinishedTasks,
        });
    };

    //the first task: after Submit clicked: push new issue in array, set isAddButtonClicked: false
    addNewTasksIssue = (newIssueTitle) => {
        const tasks = this.state.allTasks;
        const tasksIssues = tasks[0].issues.slice();
        const tasksLength = tasksIssues.length;
        const tasksLastId = tasksLength ? tasksIssues[tasksLength - 1].id : -1;

        const newIssue = {
            id: tasksLastId + 1,
            title: newIssueTitle,
            body: "",
            createTime: new Date().toLocaleString(),
        };

        const newAllTasks = [
            {
                ...tasks[0],
                isAbbButtonClicked: false,
                issues: [...tasks[0].issues, newIssue],
            },
            ...tasks.slice(1),
        ];

        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
        this.setState({
            allTasks: newAllTasks,
            activeTasks: this.state.activeTasks + 1,
        });
    };

    toggleMenuBlock = () => {
        this.setState({ isMenuVisible: !this.state.isMenuVisible });
    };
    //render

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
                                <TaskInfo
                                    allTasks={this.state.allTasks}
                                    changeIssueBody={this.changeIssueBody}
                                    deleteIssue={this.deleteIssue}
                                />
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
