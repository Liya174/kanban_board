export const initialState = {
    allTasks: [
        {
            id: 0,
            name: "Backlog",
            issues: [
                { id: 0, title: "Login page – performance issues" },
                { id: 1, title: "Sprint bugfix" },
            ],
            isAbbButtonClicked: false,
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
            ],
            isAbbButtonClicked: false,
        },
    ],
    activeTasks: 0,
    finishedTasks: 0,
};
