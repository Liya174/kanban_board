const allTasksLocal = JSON.parse(localStorage.getItem("allTasksLocal"));

export const initialState = {
    allTasks: allTasksLocal || [
        {
            id: 0,
            name: "Backlog",
            issues: [],
            isAbbButtonClicked: false,
        },
        {
            id: 1,
            name: "Ready",
            issues: [],
            isAbbButtonClicked: false,
        },
        {
            id: 2,
            name: "In progress",
            issues: [],
            isAbbButtonClicked: false,
        },
        {
            id: 3,
            name: "Finished",
            issues: [],
            isAbbButtonClicked: false,
        },
    ],
    activeTasks: 0,
    finishedTasks: 0,
    isMenuVisible: false,
};
