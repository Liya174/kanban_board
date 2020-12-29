export const initialState = {
    allTasks: [
        {
            id: 0,
            name: "Backlog",
            issues: [
                { id: 0, title: "Login page – performance issues" },
                { id: 1, title: "Sprint bugfix" },
            ],
            isAbbButtonClicked: true,
            newTaskValue: "",
        },
        {
            id: 1,
            name: "Ready",
            issues: [
                { id: 0, title: "Shop page – performance issues" },
                { id: 1, title: "Checkout bugfix" },
                { id: 2, title: "Checkout bugfix" },
                { id: 3, title: "Checkout bugfix" },
                { id: 4, title: "Checkout bugfix" },
            ],
            isAbbButtonClicked: false,
        },
        {
            id: 2,
            name: "In progress",
            issues: [
                { id: 0, title: "User page – performance issues" },
                { id: 1, title: "Auth bugfix" },
            ],
            isAbbButtonClicked: false,
        },
        {
            id: 3,
            name: "Finished",
            issues: [
                { id: 0, title: "Main page – performance issues" },
                { id: 1, title: "Main page bugfix" },
                // { id: 2, title: "Main page bugfix" },
                // { id: 3, title: "Main page bugfix" },
                // { id: 4, title: "Main page bugfix" },
                // { id: 5, title: "Main page bugfix" },
                // { id: 6, title: "Main page bugfix" },
                // { id: 7, title: "Main page bugfix" },
            ],
            isAbbButtonClicked: true,
        },
    ],
    activeTasks: 0,
    finishedTasks: 0,
};
