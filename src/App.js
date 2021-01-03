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

    //the first task: after Submit clicked: push new issue in array, set isAddButtonClicked: false
    //other: after dropdown-item clicked: push new issue in array, set isAddButtonClicked: false, delete this item from previous tasks
    addNewTasksIssue = (newIssueTitle, tasksId) => {
        const tasksIssues = this.state.allTasks[tasksId].issues.slice();
        const tasksLength = tasksIssues.length;
        const tasksLastId = tasksLength ? tasksIssues[tasksLength - 1].id : -1;
        const newIssueInPrevTasksId =
            tasksId !== 0 &&
            this.state.allTasks[tasksId - 1].issues.find(
                (issue) => issue.title === newIssueTitle
            ).id;

        const newIssue = {
            id: tasksLastId + 1,
            title: newIssueTitle,
            body: "",
            createTime: new Date().toLocaleString(),
        };

        const newAllTasks =
            tasksId === 0
                ? [
                      {
                          ...this.state.allTasks[tasksId],
                          isAbbButtonClicked: false,
                          issues: [
                              ...this.state.allTasks[tasksId].issues,
                              newIssue,
                          ],
                      },
                      ...this.state.allTasks.slice(tasksId + 1),
                  ]
                : [
                      ...this.state.allTasks.slice(0, tasksId - 1),
                      {
                          ...this.state.allTasks[tasksId - 1],
                          issues: this.state.allTasks[
                              tasksId - 1
                          ].issues.filter(
                              (issue) => issue.id !== newIssueInPrevTasksId
                          ),
                      },
                      {
                          ...this.state.allTasks[tasksId],
                          isAbbButtonClicked: false,
                          issues: [
                              ...this.state.allTasks[tasksId].issues,
                              newIssue,
                          ],
                      },
                      ...this.state.allTasks.slice(tasksId + 1),
                  ];
        localStorage.setItem("allTasksLocal", JSON.stringify(newAllTasks));
        this.setState({ allTasks: newAllTasks });
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
