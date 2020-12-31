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

    //after Submit clicked: push new backlog-issue, set isAddButtonClicked: false
    addNewTasksIssue = (newIssueTitle, tasksId) => {
        const tasksLastIssue = this.state.allTasks[tasksId].issues.slice();
        const tasksLastId = tasksLastIssue[tasksLastIssue.length - 1].id;
        const newIssueInPrevTasksId =
            tasksId !== 0 &&
            this.state.allTasks[tasksId - 1].issues.find(
                (issue) => issue.title === newIssueTitle
            ).id;

        console.log("newIssueInPrevTasksId: ", newIssueInPrevTasksId);
        const newIssue = {
            id: tasksLastId + 1,
            title: newIssueTitle,
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

        this.setState({ allTasks: newAllTasks });
    };

    //render

    render() {
        return (
            <div className="app">
                <Header />
                <Main
                    allTasks={this.state.allTasks}
                    openInput={this.openInput}
                    addNewTasksIssue={this.addNewTasksIssue}
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
