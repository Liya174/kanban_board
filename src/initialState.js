const allTasksLocal = JSON.parse(localStorage.getItem("allTasksLocal"));

export const initialState = {
    allTasks: [
        {
            id: 0,
            name: "Backlog",
            issues: allTasksLocal ? allTasksLocal[0].issues : [],
            isAbbButtonClicked: false,
        },
        {
            id: 1,
            name: "Ready",
            issues: allTasksLocal ? allTasksLocal[1].issues : [],
            isAbbButtonClicked: false,
        },
        {
            id: 2,
            name: "In progress",
            issues: allTasksLocal ? allTasksLocal[2].issues : [],
            isAbbButtonClicked: false,
        },
        {
            id: 3,
            name: "Finished",
            issues: allTasksLocal ? allTasksLocal[3].issues : [],
            isAbbButtonClicked: false,
        },
    ],
    activeTasks: 0,
    finishedTasks: 0,
};
