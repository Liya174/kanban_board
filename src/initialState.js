export const initialState = {
    allTasks: [
        {
            id: 0,
            name: "Backlog",
            issues: localStorage.getItem("backlogIssues") || [],
            isAbbButtonClicked: false,
        },
        {
            id: 1,
            name: "Ready",
            issues: localStorage.getItem("readyIssues") || [],
            isAbbButtonClicked: false,
        },
        {
            id: 2,
            name: "In progress",
            issues: localStorage.getItem("inProgressIssues") || [],
            isAbbButtonClicked: false,
        },
        {
            id: 3,
            name: "Finished",
            issues: localStorage.getItem("finishedIssues") || [],
            isAbbButtonClicked: false,
        },
    ],
    activeTasks: 0,
    finishedTasks: 0,
};
